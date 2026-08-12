"use client";

import { type CSSProperties, type FormEvent, useMemo, useState } from "react";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type ApplicationData = {
  studentName: string;
  studentEmail: string;
  mobileNumber: string;
  state: string;
  district: string;
  discipline: string;
  program: string;
};

type TysUniversityApplyFormProps = {
  submitUrl?: string;
  className?: string;
  style?: CSSProperties;
  onSubmitApplication?: (data: ApplicationData) => Promise<void> | void;
  onSuccess?: (data: ApplicationData) => void;
};

const INDIAN_STATES = [
  { code: "AP", name: "Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "CG", name: "Chhattisgarh" },
  { code: "GA", name: "Goa" },
  { code: "GJ", name: "Gujarat" },
  { code: "HR", name: "Haryana" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "JH", name: "Jharkhand" },
  { code: "KA", name: "Karnataka" },
  { code: "KL", name: "Kerala" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "MH", name: "Maharashtra" },
  { code: "MN", name: "Manipur" },
  { code: "ML", name: "Meghalaya" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "OD", name: "Odisha" },
  { code: "PB", name: "Punjab" },
  { code: "RJ", name: "Rajasthan" },
  { code: "SK", name: "Sikkim" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "TG", name: "Telangana" },
  { code: "TR", name: "Tripura" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "UK", name: "Uttarakhand" },
  { code: "WB", name: "West Bengal" },
  { code: "AN", name: "Andaman and Nicobar Islands" },
  { code: "CH", name: "Chandigarh" },
  { code: "DH", name: "Dadra and Nagar Haveli and Daman and Diu" },
  { code: "DL", name: "Delhi" },
  { code: "JK", name: "Jammu and Kashmir" },
  { code: "LA", name: "Ladakh" },
  { code: "LD", name: "Lakshadweep" },
  { code: "PY", name: "Puducherry" },
];

const DISTRICTS_BY_STATE: Record<string, string[]> = {
  AP: [
    "Srikakulam",
    "Parvathipuram Manyam",
    "Vizianagaram",
    "Visakhapatnam",
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Kakinada",
    "East Godavari",
    "Konaseema",
    "Eluru",
    "West Godavari",
    "Nandamuri Taraka Rama Rao",
    "Krishna",
    "Palnadu",
    "Guntur",
    "Bapatla",
    "Prakasam",
    "Sri Potti Sriramulu Nellore",
    "Kurnool",
    "Nandyal",
    "Anantapur",
    "YSR",
    "Annamayya",
    "Tirupati",
    "Chittoor",
  ],
  AR: [
    "Anjaw",
    "Changlang",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke-Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Dibang Valley",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
    "Itanagar City Complex",
  ],
  AS: [
    "Bajali",
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Dima Hasao",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Sivasagar",
    "South Salmara Mankachar",
    "Sonitpur",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
    "Tamulpur",
  ],
  BR: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],
  CG: [
    "Balod",
    "Baloda Bazar-Bhatapara",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurella-Pendra-Marwahi",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Kondagaon",
    "Korba",
    "Korea",
    "Mahasamund",
    "Manendragarh-Chirmiri-Bharatpur",
    "Mohla Manpur",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sarangarh-Bilaigarh",
    "Shakti",
    "Sukma",
    "Surajpur",
    "Surguja",
    "Khairagarh-Chhuikhadan-Gandai",
  ],
  GA: ["North Goa", "South Goa"],
  GJ: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhumi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ],
  HR: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],
  HP: [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],
  JH: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribag",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahibganj",
    "Seraikela-Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],
  KA: [
    "Bagalkot",
    "Bellary",
    "Belgaum",
    "Bangalore Rural",
    "Bangalore Urban",
    "Bidar",
    "Chamarajanagara",
    "Chikkaballapur",
    "Chikmagalur",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Gulbarga",
    "Hassan",
    "Haveri",
    "Kodagu",
    "Kolar",
    "Koppala",
    "Mandya",
    "Mysore",
    "Raichur",
    "Ramanagara",
    "Shimoga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayanagara",
    "Vijayapura",
    "Yadgir",
  ],
  KL: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thrissur",
    "Thiruvananthapuram",
    "Wayanad",
  ],
  MP: [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chachoda",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Narmadapuram",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa (East Nimar)",
    "Khargone (West Nimar)",
    "Maihar",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Nagda",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],
  MH: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai suburban",
    "Nanded",
    "Nandurbar",
    "Nagpur",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],
  MN: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],
  ML: [
    "East Garo Hills",
    "East Khasi Hills",
    "East Jaintia Hills",
    "Eastern West Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Jaintia Hills",
    "West Garo Hills",
    "West Khasi Hills",
  ],
  MZ: [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip",
  ],
  NL: [
    "Chumoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zunheboto",
  ],
  OD: [
    "Angul",
    "Boudh",
    "Bhadrak",
    "Balangir",
    "Bargarh",
    "Balasore",
    "Cuttack",
    "Debagarh",
    "Dhenkanal",
    "Ganjam",
    "Gajapati",
    "Jharsuguda",
    "Jajpur",
    "Jagatsinghpur",
    "Khordha",
    "Kendujhar",
    "Kalahandi",
    "Kandhamal",
    "Koraput",
    "Kendrapara",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nuapada",
    "Nayagarh",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh",
  ],
  PB: [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Firozpur",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Sri Muktsar Sahib",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar",
    "Sangrur",
    "Shahid Bhagat Singh Nagar",
    "Tarn Taran",
  ],
  RJ: [
    "Ajmer",
    "Alwar",
    "Bikaner",
    "Barmer",
    "Banswara",
    "Bharatpur",
    "Baran",
    "Bundi",
    "Bhilwara",
    "Churu",
    "Chittorgarh",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Sri Ganganagar",
    "Hanumangarh",
    "Jhunjhunu",
    "Jalore",
    "Jodhpur",
    "Jaipur",
    "Jaisalmer",
    "Jhalawar",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sikar",
    "Sawai Madhopur",
    "Sirohi",
    "Tonk",
    "Udaipur",
  ],
  SK: [
    "East Sikkim",
    "North Sikkim",
    "Pakyong",
    "Soreng",
    "South Sikkim",
    "West Sikkim",
  ],
  TN: [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Nilgiris",
    "Namakkal",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Tiruppur",
    "Tiruchirappalli",
    "Theni",
    "Tirunelveli",
    "Thanjavur",
    "Thoothukudi",
    "Tirupattur",
    "Tiruvallur",
    "Tiruvarur",
    "Tiruvannamalai",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],
  TG: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanamkonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Kumuram Bheem Asifabad",
    "Mahabubabad",
    "Mahbubnagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nalgonda",
    "Narayanpet",
    "Nagarkurnool",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Ranga Reddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri",
  ],
  TR: [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura",
  ],
  UP: [
    "Agra",
    "Aligarh",
    "Allahabad",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Azamgarh",
    "Bagpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Faizabad",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kushinagar",
    "Lakhimpur Kheri",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],
  UK: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Didihat",
    "Haridwar",
    "Kotdwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Ranikhet",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
    "Yamunotri",
  ],
  WB: [
    "Alipurduar",
    "Bankura",
    "Paschim Bardhaman",
    "Purba Bardhaman",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Maldah",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Medinipur",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],
  AN: ["Nicobar", "North and Middle Andaman", "South Andaman"],
  CH: ["Chandigarh"],
  DH: ["Daman", "Diu", "Dadra and Nagar Haveli"],
  JK: [
    "Anantnag",
    "Budgam",
    "Bandipore",
    "Baramulla",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur",
  ],
  LA: ["Kargil", "Leh"],
  LD: ["Lakshadweep"],
  DL: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ],
  PY: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
};

const DISCIPLINES = [
  {
    discipline: "Faculty of Arts",
    programs: ["BA", "MA", "PhD", "BJMC", "MJMC", "MSW", "Yoga (Diploma)", "Yoga (PG)"],
  },
  {
    discipline: "Faculty of Science",
    programs: ["B.Sc", "M.Sc", "PhD", "BCA", "MCA"],
  },
  {
    discipline: "Faculty of Commerce",
    programs: ["B.Com", "M.Com", "PhD"],
  },
  {
    discipline: "Faculty of Management",
    programs: ["BBA", "MBA", "PhD"],
  },
  {
    discipline: "Faculty of Engineering and Technology",
    programs: [
      "B.Tech (CSE)",
      "B.Tech (CSE AI & ML)",
      "B.Tech (CSE Data Science)",
      "M.Tech",
      "B.Arch",
      "Diploma Interior Designing",
    ],
  },
  {
    discipline: "Faculty of Agriculture",
    programs: ["B.Sc in Agriculture", "M.Sc in Agriculture", "Ph.D"],
  },
  {
    discipline: "Faculty of Nursing",
    programs: ["B.Sc Nursing"],
  },
  {
    discipline: "School of Pharmacy",
    programs: ["D. Pharm", "B. Pharm"],
  },
  {
    discipline: "Faculty of Law",
    programs: ["BALLB", "LLB", "LLM"],
  },
];

const initialFormData: ApplicationData = {
  studentName: "",
  studentEmail: "",
  mobileNumber: "",
  state: "",
  district: "",
  discipline: "",
  program: "",
};

function validateForm(data: ApplicationData) {
  if (!data.studentName.trim()) return "Please enter the student's name.";
  if (!/^\S+@\S+\.\S+$/.test(data.studentEmail)) return "Please enter a valid email.";
  if (!/^\d{10}$/.test(data.mobileNumber)) {
    return "Please enter a valid 10-digit mobile number.";
  }
  if (!data.state) return "Please select a state.";
  if (!data.district) return "Please select a district.";
  if (!data.discipline) return "Please select a discipline.";
  if (!data.program) return "Please select a program.";
  return "";
}

function Spinner() {
  return (
    <span className="tys-apply-spinner" aria-hidden="true" />
  );
}

export default function TysUniversityApplyForm({
  submitUrl = "/api/apply",
  className = "",
  style,
  onSubmitApplication,
  onSuccess,
}: TysUniversityApplyFormProps) {
  const [formData, setFormData] = useState<ApplicationData>(initialFormData);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const selectedState = useMemo(
    () => INDIAN_STATES.find((state) => state.name === formData.state),
    [formData.state],
  );

  const districts = selectedState ? DISTRICTS_BY_STATE[selectedState.code] ?? [] : [];

  const programs = useMemo(
    () =>
      DISCIPLINES.find((item) => item.discipline === formData.discipline)
        ?.programs ?? [],
    [formData.discipline],
  );

  const updateField = (field: keyof ApplicationData, value: string) => {
    setStatus("idle");
    setMessage("");

    setFormData((current) => {
      const next = { ...current, [field]: value };

      if (field === "mobileNumber") {
        next.mobileNumber = value.replace(/\D/g, "").slice(0, 10);
      }

      if (field === "state") {
        next.district = "";
      }

      if (field === "discipline") {
        next.program = "";
      }

      return next;
    });
  };

  const submitToUrl = async (data: ApplicationData) => {
    const payload = new FormData();
    payload.append("name", data.studentName.trim());
    payload.append("email", data.studentEmail.trim());
    payload.append("mobile", data.mobileNumber.trim());
    payload.append("state", data.state);
    payload.append("district", data.district);
    payload.append("discipline", data.discipline);
    payload.append("program", data.program);

    const response = await fetch(submitUrl, {
      method: "POST",
      body: payload,
    });

    const result: { result?: string; message?: string } = await response
      .json()
      .catch(() => ({ result: "error", message: "Unexpected server response." }));

    if (!response.ok || result.result === "error") {
      throw new Error(result.message || "Submission failed. Please try again.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationMessage = validateForm(formData);
    if (validationMessage) {
      setStatus("error");
      setMessage(validationMessage);
      return;
    }

    const applicationData = {
      ...formData,
      studentName: formData.studentName.trim(),
      studentEmail: formData.studentEmail.trim(),
      mobileNumber: formData.mobileNumber.trim(),
    };

    setStatus("submitting");
    setMessage("");

    try {
      if (onSubmitApplication) {
        await onSubmitApplication(applicationData);
      } else {
        await submitToUrl(applicationData);
      }

      setFormData(initialFormData);
      setStatus("success");
      setMessage("Application submitted successfully. Our team will contact you soon.");
      onSuccess?.(applicationData);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <form
        className={`tys-apply-form ${className}`.trim()}
        style={style}
        onSubmit={handleSubmit}
      >
        <div className="tys-apply-heading">
          <p>APPLY TODAY FOR</p>
          <h2>TYS UNIVERSITY</h2>
          <span>FATEHPUR, UTTAR PRADESH</span>
        </div>

        <div className="tys-apply-fields">
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={(event) => updateField("studentName", event.target.value)}
            placeholder="Student Name"
            aria-label="Student Name"
            disabled={status === "submitting"}
            required
          />

          <input
            type="email"
            name="studentEmail"
            value={formData.studentEmail}
            onChange={(event) => updateField("studentEmail", event.target.value)}
            placeholder="Student Email"
            aria-label="Student Email"
            disabled={status === "submitting"}
            required
          />

          <input
            type="tel"
            name="mobileNumber"
            inputMode="numeric"
            maxLength={10}
            value={formData.mobileNumber}
            onChange={(event) => updateField("mobileNumber", event.target.value)}
            placeholder="Mobile Number"
            aria-label="Mobile Number"
            disabled={status === "submitting"}
            required
          />

          <select
            name="state"
            value={formData.state}
            onChange={(event) => updateField("state", event.target.value)}
            aria-label="Select State"
            disabled={status === "submitting"}
            required
          >
            <option value="">Select State</option>
            {INDIAN_STATES.map((state) => (
              <option key={state.code} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>

          <select
            name="district"
            value={formData.district}
            onChange={(event) => updateField("district", event.target.value)}
            aria-label="Select District"
            disabled={!formData.state || status === "submitting"}
            required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <select
            name="discipline"
            value={formData.discipline}
            onChange={(event) => updateField("discipline", event.target.value)}
            aria-label="Select Discipline"
            disabled={status === "submitting"}
            required
          >
            <option value="">Select Discipline</option>
            {DISCIPLINES.map((item) => (
              <option key={item.discipline} value={item.discipline}>
                {item.discipline}
              </option>
            ))}
          </select>

          <select
            name="program"
            value={formData.program}
            onChange={(event) => updateField("program", event.target.value)}
            aria-label="Select Program"
            disabled={!formData.discipline || status === "submitting"}
            required
          >
            <option value="">Select Program</option>
            {programs.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>

        {message && (
          <p
            className={`tys-apply-message ${status === "success" ? "success" : "error"}`}
            role={status === "success" ? "status" : "alert"}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          className="tys-apply-button"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Spinner />
              SUBMITTING...
            </>
          ) : (
            "APPLY NOW"
          )}
        </button>
      </form>

      <style>{`
        .tys-apply-form {
          width: 100%;
          max-width: 430px;
          margin: 0 auto;
          padding: 28px;
          border: 1px solid rgba(14, 13, 15, 0.1);
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 24px 60px rgba(14, 13, 15, 0.18);
          color: #0e0d0f;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .tys-apply-heading {
          text-align: center;
        }

        .tys-apply-heading p {
          margin: 0;
          color: rgba(5, 73, 139, 0.82);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .tys-apply-heading h2 {
          margin: 8px 0 4px;
          color: #5a1f22;
          font-family: Poppins, Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: 22px;
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: 0;
        }

        .tys-apply-heading span {
          display: block;
          color: rgba(14, 13, 15, 0.7);
          font-size: 14px;
          font-weight: 700;
        }

        .tys-apply-fields {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 24px;
        }

        .tys-apply-form input,
        .tys-apply-form select {
          width: 100%;
          min-height: 48px;
          box-sizing: border-box;
          border: 1px solid rgba(14, 13, 15, 0.14);
          border-radius: 0;
          background: #ffffff;
          color: #0e0d0f;
          font: inherit;
          font-size: 14px;
          line-height: 1.2;
          outline: none;
          padding: 12px 14px;
          transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }

        .tys-apply-form input::placeholder {
          color: rgba(14, 13, 15, 0.52);
        }

        .tys-apply-form input:focus,
        .tys-apply-form select:focus {
          border-color: #05498b;
          box-shadow: 0 0 0 3px rgba(5, 73, 139, 0.12);
        }

        .tys-apply-form input:disabled,
        .tys-apply-form select:disabled,
        .tys-apply-button:disabled {
          cursor: not-allowed;
          opacity: 0.68;
        }

        .tys-apply-form select:disabled {
          background: #f4f4f5;
          color: rgba(14, 13, 15, 0.45);
        }

        .tys-apply-message {
          margin: 14px 0 0;
          font-size: 14px;
          line-height: 1.4;
          font-weight: 700;
        }

        .tys-apply-message.success {
          color: #15803d;
        }

        .tys-apply-message.error {
          color: #dc2626;
        }

        .tys-apply-button {
          display: flex;
          width: 100%;
          min-height: 52px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 18px;
          border: 0;
          border-radius: 6px;
          background: #5a1f22;
          color: #ffffff;
          font-family: Poppins, Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.03em;
          transition: background 160ms ease, transform 160ms ease;
        }

        .tys-apply-button:hover:not(:disabled) {
          background: #05498b;
          transform: translateY(-1px);
        }

        .tys-apply-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.38);
          border-top-color: #ffffff;
          border-radius: 999px;
          animation: tys-apply-spin 800ms linear infinite;
        }

        @keyframes tys-apply-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (min-width: 640px) {
          .tys-apply-fields {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .tys-apply-fields input:nth-child(3),
          .tys-apply-fields select:nth-child(4),
          .tys-apply-fields select:nth-child(5),
          .tys-apply-fields select:nth-child(6),
          .tys-apply-fields select:nth-child(7) {
            grid-column: span 2;
          }
        }

        @media (max-width: 420px) {
          .tys-apply-form {
            padding: 22px 16px;
          }

          .tys-apply-heading h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}
