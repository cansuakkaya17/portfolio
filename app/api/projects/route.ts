import { NextResponse } from "next/server";

export async function GET() {
  const dummyProjects = [
    {
      id: 1,
      title: "Banka Müşteri Kayıp Tahmini",
      description: "Makine öğrenmesi ile banka müşteri churn tahmini modeli.",
      github_url: "https://github.com",
    },
    {
      id: 2,
      title: "Veri Analitiği Portföyü",
      description: "Python ve SQL ile geliştirilmiş büyük veri analizi projeleri.",
      github_url: "https://github.com",
    },
  ];

  return NextResponse.json(dummyProjects);
}