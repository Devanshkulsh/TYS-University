import { NextResponse } from "next/server";

const RECRUITMENT_GOOGLE_SCRIPT_URL =
  process.env.RECRUITMENT_GOOGLE_SCRIPT_URL ?? "";

const educationSheetColumns = [
  { key: "board", label: "Board / University" },
  { key: "year", label: "Year" },
  { key: "subjects", label: "Subjects" },
  { key: "roll", label: "Roll No." },
  { key: "marks", label: "Marks Obtained" },
  { key: "total", label: "Total Marks" },
  { key: "grade", label: "Grade" },
  { key: "division", label: "Division" },
  { key: "encl", label: "Encl. No." },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function flattenRecruitmentPayload(payload: Record<string, unknown>) {
  const { education, ...sheetData } = payload;

  if (!Array.isArray(education)) {
    return sheetData;
  }

  education.forEach((row, rowIndex) => {
    if (!isRecord(row)) return;

    const standard =
      typeof row.standard === "string" && row.standard.trim()
        ? row.standard
        : `Education ${rowIndex + 1}`;

    educationSheetColumns.forEach((column) => {
      sheetData[`${standard} - ${column.label}`] = row[column.key] ?? "";
    });
  });

  return sheetData;
}

export async function POST(request: Request) {
  if (!RECRUITMENT_GOOGLE_SCRIPT_URL) {
    return NextResponse.json(
      {
        result: "error",
        message: "Server is missing RECRUITMENT_GOOGLE_SCRIPT_URL env var.",
      },
      { status: 500 },
    );
  }

  try {
    const payload = await request.json();

    if (!isRecord(payload)) {
      return NextResponse.json(
        { result: "error", message: "Invalid recruitment form payload." },
        { status: 400 },
      );
    }

    const scriptResponse = await fetch(RECRUITMENT_GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formName: "Recruitment Application",
        submittedAt: new Date().toISOString(),
        data: flattenRecruitmentPayload(payload),
      }),
    });

    const rawText = await scriptResponse.text();

    let parsed: { result?: string; message?: string };
    try {
      parsed = JSON.parse(rawText);
    } catch {
      parsed = {
        result: "error",
        message: `Unexpected response: ${rawText.slice(0, 200)}`,
      };
    }

    if (!scriptResponse.ok || parsed.result !== "success") {
      return NextResponse.json(
        {
          result: "error",
          message: parsed.message ?? "Google Sheets rejected the submission.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ result: "success" });
  } catch (error) {
    console.error("Recruitment form submission failed:", error);
    return NextResponse.json(
      {
        result: "error",
        message: "Could not reach Google Sheets. Please try again.",
      },
      { status: 502 },
    );
  }
}
