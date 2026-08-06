export type ProgramCategory =
  | "Undergraduate"
  | "Postgraduate"
  | "Doctoral"
  | "Diploma";

export type Program = {
  name: string;
  category: ProgramCategory;
  specializations?: string[];
  eligibility?: string;
  duration?: string;
};

export type FacultyPrograms = {
  discipline: string;
  sectionId: string;
  brochurePage: number;
  description: string;
  programs: Program[];
};

export const brochureSourceNote =
  "Programs, eligibility, and duration details are extracted from the brochure shared for this project. The tuition fee column was visible in the brochure layout, but no fee values were readable in the supplied pages.";

export const programCatalog: FacultyPrograms[] = [
  {
    discipline: "Faculty of Arts",
    sectionId: "faculty-of-arts",
    brochurePage: 9,
    description:
      "Cultivating critical thinking, humanities, and broad academic excellence across undergraduate and postgraduate study.",
    programs: [
      {
        name: "BA",
        category: "Undergraduate",
        eligibility: "10+2 (any stream), min. 45%",
        duration: "3 Years",
      },
      {
        name: "MA",
        category: "Postgraduate",
        specializations: [
          "English",
          "Sanskrit",
          "Urdu",
          "Economics",
          "Sociology",
          "Music",
        ],
        eligibility: "Graduation (BA), min. 50%",
        duration: "2 Years",
      },
      {
        name: "PhD",
        category: "Doctoral",
        eligibility: "MA + SET, min. 55%",
      },
      {
        name: "BJMC",
        category: "Undergraduate",
        eligibility: "MA + SET, min. 55%",
        duration: "3 Years",
      },
      {
        name: "MJMC",
        category: "Postgraduate",
        eligibility: "MA + SET, min. 55%",
        duration: "2 Years",
      },
      {
        name: "MSW",
        category: "Postgraduate",
        duration: "2 Years",
      },
      {
        name: "Yoga (Diploma)",
        category: "Diploma",
        eligibility: "10+2 (any stream), min. 45%",
      },
      {
        name: "Yoga (PG)",
        category: "Postgraduate",
        eligibility: "Graduation (any stream), min. 50%",
      },
    ],
  },
  {
    discipline: "Faculty of Science",
    sectionId: "faculty-of-science",
    brochurePage: 9,
    description:
      "Fostering analytical thinking and foundational research across core scientific disciplines.",
    programs: [
      {
        name: "B.Sc",
        category: "Undergraduate",
        eligibility: "10+2 (Science stream), min. 50%",
        duration: "3 Years",
      },
      {
        name: "Bsc CS",
        category: "Undergraduate",
        eligibility: "10+2 (Science stream), min. 50%",
        duration: "3 Years",
      },
      {
        name: "BSc IT",
        category: "Undergraduate",
        eligibility: "10+2 (Science stream), min. 50%",
        duration: "3 Years",
      },

      {
        name: "BSc Biotech",
        category: "Undergraduate",
        eligibility: "10+2 (Science stream), min. 50%",
        duration: "3 Years",
      },

      {
        name: "BSc (Ag.)",
        category: "Undergraduate",
        eligibility: "10+2 (Science stream), min. 50%",
        duration: "3 Years",
      },



      {
        name: "M.Sc",
        category: "Postgraduate",
        specializations: ["Physics", "Chemistry", "Botany", "Maths"],
        eligibility: "B.Sc (relevant subject), min. 50%",
        duration: "2 Years",
      },
      {
        name: "PhD",
        category: "Doctoral",
        eligibility: "M.Sc + GATE, min. 55%",
      },
      {
        name: "BCA",
        category: "Undergraduate",
        eligibility: "10+2 with Maths, min. 45%",
        duration: "2 Years",
      },
      {
        name: "MCA",
        category: "Postgraduate",
        eligibility: "BCA/B.Sc IT with Maths, min. 50%",
        duration: "2 Years",
      },
    ],
  },
  {
    discipline: "Faculty of Commerce",
    sectionId: "faculty-of-commerce",
    brochurePage: 10,
    description:
      "Offering advanced insight into finance, trade, and economic systems for tomorrow's business landscape.",
    programs: [
      {
        name: "B.Com",
        category: "Undergraduate",
        eligibility: "10+2 (any stream), min. 45%",
        duration: "3 Years",
      },
      {
        name: "M.Com",
        category: "Postgraduate",
        eligibility: "B.Com/Graduation, min. 50%",
        duration: "2 Years",
      },
      {
        name: "PhD",
        category: "Doctoral",
        eligibility: "M.Com + SET, min. 55%",
      },
    ],
  },
  {
    discipline: "Faculty of Management",
    sectionId: "faculty-of-management",
    brochurePage: 10,
    description:
      "Shaping future corporate leaders and entrepreneurs with market-ready business acumen.",
    programs: [
      {
        name: "BBA",
        category: "Undergraduate",
        eligibility: "10+2 (any stream), min. 45%",
        duration: "3 Years",
      },
      {
        name: "MBA",
        category: "Postgraduate",
        eligibility: "B.Com/Graduation, min. 50%",
        duration: "2 Years",
      },
      {
        name: "PhD",
        category: "Doctoral",
        eligibility: "M.Com + SET, min. 55%",
      },
    ],
  },
  {
    discipline: "Faculty of Engineering and Technology",
    sectionId: "faculty-of-engineering-and-technology",
    brochurePage: 10,
    description:
      "Driving innovation through technical education, applied learning, and industry-oriented engineering pathways.",
    programs: [
      {
        name: "B.Tech (CSE)",
        category: "Undergraduate",
        eligibility: "10+2 (PCM), min. 50% + JEE/State CET",
        duration: "3 Years",
      },
      {
        name: "B.Tech (CSE AI & ML)",
        category: "Undergraduate",
        eligibility: "10+2 (PCM), min. 50% + JEE/State CET",
        duration: "2 Years",
      },
      {
        name: "B.Tech (CSE Data Science)",
        category: "Undergraduate",
        eligibility: "10+2 (PCM), min. 50% + JEE/State CET",
      },
      {
        name: "M.Tech",
        category: "Postgraduate",
        eligibility: "B.Tech/BE (relevant branch), min. 50% + GATE",
        duration: "3 Years",
      },
      {
        name: "B.Arch",
        category: "Undergraduate",
        eligibility: "10+2 (PCM), min. 50% + NATA/JEE Paper 2",
        duration: "2 Years",
      },
      {
        name: "Diploma Interior Designing",
        category: "Diploma",
        eligibility: "10+2 (any stream), min. 45%",
        duration: "2 Years",
      },
    ],
  },
  {
    discipline: "Faculty of Agriculture",
    sectionId: "faculty-of-agriculture",
    brochurePage: 11,
    description:
      "Advancing modern agricultural practice, sustainable farming, and agritech-focused education.",
    programs: [
      {
        name: "B.Sc in Agriculture",
        category: "Undergraduate",
        eligibility: "10+2 (Science/Agriculture), min. 50%",
        duration: "4 Years",
      },
      {
        name: "M.Sc in Agriculture",
        category: "Postgraduate",
        eligibility: "B.Sc Agriculture, min. 50%",
        duration: "2 Years",
      },
      {
        name: "Ph.D",
        category: "Doctoral",
        eligibility: "M.Sc Agriculture, min. 55%",
        duration: "3 Years",
      },
    ],
  },
  {
    discipline: "Faculty of Nursing",
    sectionId: "faculty-of-nursing",
    brochurePage: 11,
    description:
      "Training compassionate healthcare professionals for the demands of modern clinical care.",
    programs: [
      {
        name: "B.Sc Nursing",
        category: "Undergraduate",
        eligibility: "10+2 (PCB), min. 45% + 17 yrs age",
        duration: "4 Years",
      },
    ],
  },
  {
    discipline: "School of Pharmacy",
    sectionId: "school-of-pharmacy",
    brochurePage: 11,
    description:
      "Delivering focused education in pharmaceutical sciences, drug practice, and patient-facing healthcare support.",
    programs: [
      {
        name: "D. Pharm",
        category: "Diploma",
        eligibility: "10+2 (PCM), min. 50% + JEE/State CET",
        duration: "2 Years",
      },
      {
        name: "B. Pharm",
        category: "Undergraduate",
        eligibility: "10+2 (PCM), min. 50% + JEE/State CET",
        duration: "4 Years",
      },
    ],
  },
  {
    discipline: "Faculty of Law",
    sectionId: "faculty-of-law",
    brochurePage: 11,
    description:
      "Delivering comprehensive legal education anchored in ethics, advocacy, and justice.",
    programs: [
      {
        name: "BALLB",
        category: "Undergraduate",
        eligibility: "10+2 (any stream), min. 45% + CLAT/LSAT",
        duration: "5 Years",
      },
      {
        name: "LLB",
        category: "Postgraduate",
        eligibility: "Graduation (any stream), min. 45% + CLAT/entrance",
        duration: "3 Years",
      },
      {
        name: "LLM",
        category: "Postgraduate",
        eligibility: "LLB, min. 50%",
      },
    ],
  },
];

export type Discipline = {
  discipline: string;
  programs: string[];
};

export const disciplines: Discipline[] = programCatalog.map((faculty) => ({
  discipline: faculty.discipline,
  programs: faculty.programs.map((program) => program.name),
}));
