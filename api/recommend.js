const MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "OPENAI_API_KEY is not configured" });
  }

  try {
    const body = parseBody(req.body);
    const payload = buildPromptPayload(body);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        instructions:
          "あなたは日本の家庭料理とお酒の相性に詳しい、ミニマルで実用的な料理AIです。返答は必ず指定されたJSONスキーマに従い、日本語で、買い物しやすく、調理工程は短く具体的にしてください。",
        input: JSON.stringify(payload),
        reasoning: { effort: "low" },
        max_output_tokens: 1600,
        text: {
          format: {
            type: "json_schema",
            name: "meal_mood_recommendation",
            strict: true,
            schema: recommendationSchema,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: "OpenAI request failed", detail: errorText.slice(0, 500) });
    }

    const data = await response.json();
    const output = extractOutputText(data);
    if (!output) {
      return res.status(502).json({ error: "No model output" });
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(JSON.parse(output));
  } catch (error) {
    return res.status(500).json({ error: "Recommendation failed", detail: error.message });
  }
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "string") return JSON.parse(body);
  return body;
}

function buildPromptPayload(body) {
  const inputs = body.inputs || {};
  return {
    task: "今日の気分、天気、運動量、体力、食材、お酒、追加要望に合わせて一皿とお酒を提案する",
    constraints: {
      ingredientsCanBeEmpty: "食材が空欄なら買い足し前提で提案する",
      ownedDrinksCanBeEmpty: "手持ち酒が空欄なら買うなら何が良いか提案する",
      style: "おしゃれ、ミニマル、でも少し可愛い雰囲気の短い日本語",
      safety: "一般家庭向け。生肉、生魚、加熱不足を避ける具体的な手順にする",
    },
    inputs: {
      mood: String(inputs.mood || "やさしい"),
      weather: String(inputs.weather || "晴れ"),
      activity: String(inputs.activity || "普通"),
      energy: String(inputs.energy || "20分"),
      ingredients: Array.isArray(inputs.ingredients) ? inputs.ingredients.slice(0, 12).map(String) : [],
      ownedDrinks: Array.isArray(inputs.ownedDrinks) ? inputs.ownedDrinks.slice(0, 12).map(String) : [],
      wantDrink: Boolean(inputs.wantDrink),
      request: String(body.request || ""),
      variation: Number(body.variation || 0),
    },
  };
}

function extractOutputText(data) {
  if (typeof data.output_text === "string") return data.output_text;
  const content = data.output?.flatMap((item) => item.content || []) || [];
  const textItem = content.find((item) => item.type === "output_text" && typeof item.text === "string");
  return textItem?.text || "";
}

const recommendationSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "score", "summary", "time", "effort", "protein", "ingredients", "steps", "drink"],
  properties: {
    title: { type: "string" },
    score: { type: "integer", minimum: 70, maximum: 99 },
    summary: { type: "string" },
    time: { type: "integer", minimum: 5, maximum: 60 },
    effort: { type: "string", enum: ["かなり簡単", "ふつう", "ゆっくり"] },
    protein: { type: "string" },
    ingredients: {
      type: "array",
      minItems: 4,
      maxItems: 10,
      items: { type: "string" },
    },
    steps: {
      type: "array",
      minItems: 3,
      maxItems: 6,
      items: { type: "string" },
    },
    drink: {
      type: "object",
      additionalProperties: false,
      required: ["name", "reason", "pairings"],
      properties: {
        name: { type: "string" },
        reason: { type: "string" },
        pairings: {
          type: "array",
          minItems: 1,
          maxItems: 4,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "level", "note"],
            properties: {
              name: { type: "string" },
              level: { type: "string" },
              note: { type: "string" },
            },
          },
        },
      },
    },
  },
};
