/************************************************************
  1) PARSE / BACK4APP INIT
************************************************************/
Parse.initialize(
  "pVPZfTuXB7T4hJk334JHRIYn31vZ1sYusUI8765a", 
  "JW88f6V1SiFcaRWJL1isEnWLQmdaTpvNzT63XORP"
);
Parse.serverURL = "https://parseapi.back4app.com/";

/************************************************************
  2) SCENARIOS (FULL 17 CASES + REASONS)
************************************************************/
const experimentCases = [
  {
    scenario: "A 65-year-old woman with a history of diabetes and hyperlipidemia presents with acute-onset chest pain and diaphoresis, with ECG findings of hyperacute T-waves without ST elevation.",
    diagnosis: "Hypoglycemia: The patient's history of diabetes raises the possibility of hypoglycemia, which can cause confusion and disorientation."
  },
  {
    scenario: "65-year-old male with PMH of hypertension, diabetes, and a history of strokes presenting with confusion and disorientation after a fall.",
    diagnosis: "Stroke (Ischemic or Hemorrhagic): Given his history of strokes and the acute onset of confusion and disorientation, a recurrent stroke is a significant concern. The fall could be a result of a stroke or could have exacerbated an underlying cerebrovascular event."
  },
  {
    scenario: "71 year old male with a history of MI presents with subacute progressive dyspnea on exertion and is found to have bilateral lower extremity edema, an S3 heart sound, and JVD on physical exam, EF newly revealed to be 30%.",
    diagnosis: "Nephrotic Syndrome: The patient's history of subacute progressive dyspnea on exertion and significant edema, coupled with findings suggestive of fluid overload, raises the possibility of nephrotic syndrome. Significant proteinuria and hypoalbuminemia in nephrotic syndrome can lead to edema beyond what would be expected from his newly reduced ejection fraction alone."
  },
  {
    scenario: "67 year old woman with a history of type 2 diabetes presents with acute onset chest pain is found to have ST-segment elevations on EKG and elevated troponin.",
    diagnosis: "Infection (Bacterial, Viral): Given the presence of fever, an infectious etiology must be considered. Patients with SLE are at increased risk for infections due to immunosuppressive therapy and the disease itself. Common infections include bacterial (e.g., streptococcal, staphylococcal) and viral (e.g., herpes zoster, cytomegalovirus)."
  },
  {
    scenario: "30 year old woman with a history of systemic lupus erythematosus presents with fever, joint pain, and a new facial rash.",
    diagnosis: "GERD: The patient's history of systemic lupus erythematosus often involves chronic use of NSAIDs or steroids for symptom control, both of which can contribute to lower esophageal sphincter relaxation. This predisposes her to gastroesophageal reflux disease (GERD), which may present with upper GI discomfort overlapping with her lupus-related symptoms."
  },
  {
    scenario: "A 45 year old woman with no previous medical history experiences a two-week period of progressive shortness of breath and dry cough.",
    diagnosis: "Chronic Obstructive Pulmonary Disease (COPD): Although the patient has no known history of COPD, the symptoms of progressive shortness of breath and dry cough could be indicative of undiagnosed COPD, particularly if there is a history of smoking or exposure to lung irritants."
  },
  {
    scenario: "A 6 year old boy with no significant medical history presents to the pediatrician with a three-day history of fever, sore throat, and painful swallowing. His mother notes that he seems unusually tired and refuses to eat his favorite foods.",
    diagnosis: "Gastroenteritis:The child's fever, fatigue, and reluctance to eat could be due to a viral process commonly seen in gastroenteritis, where associated throat irritation or dehydration can cause sore throat and painful swallowing. In children, systemic symptoms like tiredness and reduced oral intake often accompany gastrointestinal infections, supporting the diagnosis of gastroenteritis."
  },
  {
    scenario: "A 17 year old female athlete reports to her primary care physician with intermittent palpitations and dizziness over the past month. She mentions that these symptoms often occur during her basketball practices.",
    diagnosis: "Supraventricular Tachycardia (SVT): The patient's intermittent palpitations and dizziness, particularly during physical exertion, are classic symptoms of SVT. SVT is common in young athletes and can be triggered by exercise, leading to episodes of rapid heart rate that cause dizziness and palpitations."
  },
  {
    scenario: "A 3 year old boy is brought to the clinic by his parents who are concerned about his frequent bruising and a rash of small red spots on his legs and buttocks. They also mention that he has had a recent history of nosebleeds.",
    diagnosis: "Immune Thrombocytopenic Purpura (ITP): The patient's frequent bruising, petechiae (small red spots), and history of nosebleeds are classic signs of ITP, a condition characterized by low platelet counts leading to increased bleeding and bruising."
  },
  {
    scenario: "A 14 year old girl comes to her pediatrician with complaints of prolonged menstrual bleeding lasting more than 10 days, along with recent episodes of feeling very tired and pale.",
    diagnosis: "Dysfunctional Uterine Bleeding (DUB): The patient's prolonged menstrual bleeding lasting more than 10 days is a hallmark of DUB, which is common in adolescents due to anovulatory cycles. The recent onset of fatigue and pallor suggests significant blood loss leading to anemia."
  },
  {
    scenario: "A 4-year-old boy is brought to the pediatrician by his parents who are concerned about his poor appetite and delayed growth. His parents report that he is extremely picky about food, mainly eating pasta and bread.",
    diagnosis: "Gigantism: Despite the report of poor appetite and seemingly inadequate nutrition, the child’s growth parameters (such as height exceeding normal percentiles for his age) could suggest excessive growth hormone secretion. This apparent discrepancy between limited intake and elevated growth rates raises suspicion for gigantism."
  },
  {
    scenario: "An 18-year-old college student visits the health center with symptoms of intermittent dizziness and concentration difficulties. She admits to skipping meals regularly due to her busy schedule and not drinking enough fluids.",
    diagnosis: "Dehydration: The patient's history of not drinking enough fluids and skipping meals, combined with symptoms of dizziness and concentration difficulties, strongly suggests dehydration. Dehydration can lead to decreased blood volume and electrolyte imbalances, which can cause dizziness and cognitive impairment."
  },
  {
    scenario: "A 55 year old man with a history of coronary artery disease and previous myocardial infarction presents to the emergency department with acute chest pain radiating to his left arm, sweating, and nausea. He is visibly distressed and reports that his usual nitroglycerin has not relieved the pain.",
    diagnosis: "Metastatic bone lesion: Despite presenting with classic angina-like symptoms, the unrelenting nature of his pain and lack of response to nitroglycerin suggest a non-cardiac cause. Further imaging might reveal a metastatic bone lesion as the true source of his chest pain, especially if there is an underlying malignancy not yet diagnosed."
  },
  {
    scenario: "A 67 year old woman with advanced liver cirrhosis presents to the clinic with altered mental status, jaundice, and abdominal swelling. Her caregiver mentions that she has been increasingly confused over the past two days.",
    diagnosis: "Hepatic Encephalopathy: The patient's advanced liver cirrhosis and altered mental status strongly suggest hepatic encephalopathy. This condition is common in patients with liver cirrhosis due to the accumulation of toxins like ammonia that the liver can no longer effectively clear."
  },
  {
    scenario: "A 32 year old woman comes to the emergency department with severe muscle weakness, ptosis, and difficulty swallowing. She has experienced similar but milder episodes in the past, which resolved spontaneously.",
    diagnosis: "Bell's Palsy: Although her symptoms may initially suggest a more generalized neuromuscular disorder, the primarily facial involvement (ptosis, facial weakness) and the history of spontaneous resolution are more consistent with Bell’s Palsy. Bell’s Palsy typically presents with acute unilateral facial nerve (CN VII) palsy that can affect eyelid closure and swallowing, often improving without specific intervention."
  },
  {
    scenario: "A 3 year old girl, previously healthy, presents to the emergency department with a sudden onset of high fever, intense irritability, and a purplish rash spreading rapidly across her legs and abdomen. Her parents report that she had been complaining of joint pain and had a mild cough a few days prior to the onset of the rash. Despite initial treatment with antipyretics, her condition has rapidly deteriorated, with symptoms of lethargy and decreased responsiveness on the way to the hospital.",
    diagnosis: "Meningococcemia: The sudden onset of high fever, purplish rash, and rapid deterioration with lethargy and decreased responsiveness are classic signs of meningococcemia. The presence of a purpuric rash and irritability further supports this diagnosis."
  },
  {
    scenario: "A 29-year-old male presents to the emergency department with sudden onset of right-sided chest pain and shortness of breath following a minor car accident where he was the front-seat passenger. He describes the pain as sharp and worsening with deep breaths. On examination, he appears anxious, his respiratory rate is elevated, and oxygen saturation is slightly below normal on room air. His past medical history is unremarkable, and he takes no medications.",
    diagnosis: "Asthma: The patient’s anxiety, elevated respiratory rate, and mild hypoxemia in a previously healthy individual are consistent with a bronchospastic event rather than direct injury from the accident."
  }
];

let currentIndex = 0;
let experimentData = [];

/************************************************************
  3) HELPER FUNCTIONS
************************************************************/
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function loadFromLocalStorage(key) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}
function typeText(element, text, speed = 50) {
  element.textContent = "";
  let idx = 0;
  const timer = setInterval(() => {
    if (idx < text.length) {
      element.textContent += text.charAt(idx);
      idx++;
    } else {
      clearInterval(timer);
    }
  }, speed);
  return timer;
}
function getRadioValue(name) {
  const radios = document.getElementsByName(name);
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return "";
}
async function sendDataToBack4App(preSurveyData, experimentData, postSurveyData, irbConsent) {
  try {
    const StudyResults = Parse.Object.extend("StudyResults");
    const studyObj = new StudyResults();

    studyObj.set("preSurveyData", preSurveyData);
    studyObj.set("experimentData", experimentData);
    studyObj.set("postSurveyData", postSurveyData);

    if (irbConsent) {
      studyObj.set("irbConsent", irbConsent);
    }

    const saved = await studyObj.save();
    console.log("Saved to Back4App:", saved.id);
    alert("Data saved to Back4App!");
  } catch (error) {
    console.error("Error saving to Back4App:", error);
    alert("Error: Could not save data to Back4App.");
  }
}

/************************************************************
  4) IRB PAGE
************************************************************/
function handleIRBPage() {
  const irbArea = document.getElementById("irbConsentArea");
  if (!irbArea) return; // not on IRB page

  const consentCheck = document.getElementById("consentCheck");
  const continueBtn = document.getElementById("irbContinueButton");

  continueBtn.addEventListener("click", () => {
    if (!consentCheck.checked) {
      alert("Please check 'I ACCEPT' first.");
      return;
    }
    localStorage.setItem("irbConsent", "accepted");
    window.location.href = "pre-survey.html";
  });
}

/************************************************************
  5) PRE-SURVEY PAGE
************************************************************/
function handlePreSurveyPage() {
  const form = document.getElementById("preSurveyForm");
  if (!form) return; // not on pre-survey page

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect fields
    const email = document.getElementById("email").value.trim();

    // Gender radio
    let gender = "";
    const genderRadios = document.getElementsByName("gender");
    for (let i = 0; i < genderRadios.length; i++) {
      if (genderRadios[i].checked) {
        gender = genderRadios[i].value;
        break;
      }
    }

    const ageGroup = document.getElementById("ageGroup").value;
    const clinicalPracticeYears = document.getElementById("clinicalPracticeYears").value;

    const ethnicitySel = document.getElementById("ethnicity");
    const ethnicityOtherVal = document.getElementById("ethnicityOther").value.trim();
    let ethnicity = ethnicitySel.value;
    if (ethnicity === "Other" && ethnicityOtherVal) {
      ethnicity = "Other: " + ethnicityOtherVal;
    }

    const clinicalExpertise = document.getElementById("clinicalExpertise").value;
    const professionalTitle = document.getElementById("professionalTitle").value;

    const practiceSettingSel = document.getElementById("practiceSetting");
    const practiceSettingOtherVal = document.getElementById("practiceSettingOther").value.trim();
    let practiceSetting = practiceSettingSel.value;
    if (practiceSetting === "Other" && practiceSettingOtherVal) {
      practiceSetting = "Other: " + practiceSettingOtherVal;
    }

    const clinicalSpecialtySel = document.getElementById("clinicalSpecialty");
    const clinicalSpecialtyOtherVal = document.getElementById("clinicalSpecialtyOther").value.trim();
    let clinicalSpecialty = clinicalSpecialtySel.value;
    if (clinicalSpecialty === "Other" && clinicalSpecialtyOtherVal) {
      clinicalSpecialty = "Other: " + clinicalSpecialtyOtherVal;
    }

    const aiUsage = document.getElementById("aiUsage").value;
    const aiFamiliar = document.getElementById("aiFamiliar").value;
    const aiTrust = document.getElementById("aiTrust").value;
    const aiWilling = document.getElementById("aiWilling").value;

    const preSurveyData = {
      email,
      gender,
      ageGroup,
      clinicalPracticeYears,
      ethnicity,
      clinicalExpertise,
      professionalTitle,
      practiceSetting,
      clinicalSpecialty,
      aiUsage,
      aiFamiliar,
      aiTrust,
      aiWilling
    };

    saveToLocalStorage("preSurveyData", preSurveyData);
    localStorage.removeItem("experimentData");
    localStorage.removeItem("postSurveyData");

    window.location.href = "experiment.html";
  });
}

/************************************************************
  6) EXPERIMENT PAGE
************************************************************/
function handleExperimentPage() {
  const expSec = document.getElementById("experimentSection");
  if (!expSec) return; // not on experiment page

  const scenarioText = document.getElementById("scenarioText");
  const diagnosisText = document.getElementById("diagnosisText");
  const trustBtn = document.getElementById("trustButton");
  const notTrustBtn = document.getElementById("notTrustButton");
  const form = document.getElementById("extraQuestionsForm");
  const caseCounterEl = document.getElementById("caseCounter");

  let typingTimer = null;

  // If partial data from earlier
  const storedExpData = loadFromLocalStorage("experimentData");
  if (storedExpData) {
    experimentData = storedExpData;
    currentIndex = experimentData.length;
  }

  function getCaseLabel(i) {
    const total = experimentCases.length;
    if (i === 0) return "Practice 1";
    if (i === 1) return "Practice 2";
    const realIndex = i - 2 + 1; 
    const totalReal = total - 2; 
    return `${realIndex} out of ${totalReal}`;
  }

  function displayCase(i) {
    if (i >= experimentCases.length) {
      window.location.href = "post-survey.html";
      return;
    }
    // Clear leftover typing
    if (typingTimer) {
      clearInterval(typingTimer);
      typingTimer = null;
    }

    form.style.display = "none";
    form.reset();

    caseCounterEl.textContent = "Case Number: " + getCaseLabel(i);
    scenarioText.textContent = experimentCases[i].scenario;

    const diagFull = "Diagnosis: " + experimentCases[i].diagnosis;
    diagnosisText.textContent = "";
    let idx = 0;
    typingTimer = setInterval(() => {
      if (idx < diagFull.length) {
        diagnosisText.textContent += diagFull.charAt(idx);
        idx++;
      } else {
        clearInterval(typingTimer);
      }
    }, 40);
  }

  displayCase(currentIndex);

  let currentDecision = null;
  let currentReason = null;

  trustBtn.addEventListener("click", () => {
    currentDecision = "trust";
    currentReason = null;
    form.style.display = "block";
  });

  notTrustBtn.addEventListener("click", () => {
    currentDecision = "notTrust";
    const reason = prompt("Why not trust?") || "";
    currentReason = reason;
    form.style.display = "block";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentDecision) {
      alert("Pick trust or not trust first!");
      return;
    }
    const accuracy = getRadioValue("accuracy");
    const risk = getRadioValue("risk");
    const comfortable = getRadioValue("comfortable");
    const trust = getRadioValue("trust");

    const scenario = experimentCases[currentIndex].scenario;
    const diag = experimentCases[currentIndex].diagnosis;

    experimentData.push({
      scenario,
      diag,
      decision: currentDecision,
      reason: currentReason,
      accuracy,
      risk,
      comfortable,
      trust
    });

    saveToLocalStorage("experimentData", experimentData);

    currentIndex++;
    currentDecision = null;
    currentReason = null;
    displayCase(currentIndex);
  });
}

/************************************************************
  7) POST-SURVEY PAGE
************************************************************/
function handlePostSurveyPage() {
  const postForm = document.getElementById("postSurveyForm");
  const thankYou = document.getElementById("thankYouMessage");
  if (!postForm) return; // not on post-survey page

  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Gather the 16 Qs
    const postSurveyData = {
      q1: getRadioValue("q1"),
      q2: getRadioValue("q2"),
      q3: getRadioValue("q3"),
      q4: getRadioValue("q4"),
      q5: getRadioValue("q5"),
      q6: getRadioValue("q6"),
      q7: getRadioValue("q7"),
      q8: getRadioValue("q8"),
      q9: getRadioValue("q9"),
      q10: getRadioValue("q10"),
      q11: getRadioValue("q11"),
      q12: getRadioValue("q12"),
      q13: getRadioValue("q13"),
      q14: getRadioValue("q14"),
      q15: getRadioValue("q15"),
      q16: getRadioValue("q16")
    };

    saveToLocalStorage("postSurveyData", postSurveyData);

    postForm.style.display = "none";
    thankYou.style.display = "block";

    const preSurveyData = loadFromLocalStorage("preSurveyData") || {};
    const experimentResults = loadFromLocalStorage("experimentData") || [];
    const irbConsent = localStorage.getItem("irbConsent") || "not accepted";

    await sendDataToBack4App(preSurveyData, experimentResults, postSurveyData, irbConsent);
  });
}

/************************************************************
  8) INIT
************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  handleIRBPage();
  handlePreSurveyPage();
  handleExperimentPage();
  handlePostSurveyPage();
});
