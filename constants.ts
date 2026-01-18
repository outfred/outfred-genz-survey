import { SurveyData } from './types';

export const SURVEY_CONTENT: SurveyData = {
  intro: {
    titleAr: "يا مساء الفل! 👋",
    titleFr: "Ya Msaa El Fol! 👋",
    bodyAr: "إحنا في Outfred بنحاول نعمل ثورة في طريقة لبسنا وشراءنا في مصر. سيبك من الكلام الرسمي، وجاوبنا بصراحة.. إيه اللي بيطلع عينك وأنت بتشتري لبس؟ دقيقتين بس وهتساعدنا نغير اللعبة!",
    bodyFr: "E7na fee Outfred ben7awel ne3mel sawra fee tare2et lebsena w sherana fee Masr. Seibak men el kalam el rasmy, w gawbna be sara7a.. Eh elly bytla3 3einak w enta betshtery lebs? De2e2tein bas w hatsa3edna neghayar el le3ba!"
  },
  sections: [
    {
      id: "contact",
      titleAr: "بياناتك يا جميل 😉",
      titleFr: "Bayanatak Ya Gameel 😉",
      questions: [
        {
          id: "name",
          type: "text",
          questionAr: "اسمك إيه؟",
          questionFr: "Esmak eh?",
        },
        {
          id: "phone",
          type: "text",
          questionAr: "رقم موبايلك (عشان نبعتلك المفاجآت)",
          questionFr: "Raqam mobilek (3ashan neb3atlak el mofag2at)",
        }
      ]
    },
    {
      id: "basics",
      titleAr: "البيانات الأساسية",
      titleFr: "El Bayanat El Asaseya",
      questions: [
        {
          id: "gender",
          type: "radio",
          questionAr: "أنت ولد ولا بنت؟",
          questionFr: "Enta walad wala bent?",
          options: [
            { id: "male", textAr: "ولد", textFr: "Walad" },
            { id: "female", textAr: "بنت", textFr: "Bent" }
          ]
        },
        {
          id: "age",
          type: "radio",
          questionAr: "سنك كام؟",
          questionFr: "Sennak kam?",
          options: [
            { id: "under_18", textAr: "أقل من 18", textFr: "Under 18" },
            { id: "18_24", textAr: "18 - 24", textFr: "18 - 24" },
            { id: "25_34", textAr: "25 - 34", textFr: "25 - 34" },
            { id: "35_plus", textAr: "35+", textFr: "35+" }
          ]
        },
        {
          id: "location",
          type: "radio",
          questionAr: "ساكن في منطقة إيه؟",
          questionFr: "Saken fee manta2et eh?",
          options: [
            { id: "cairo", textAr: "القاهرة", textFr: "Cairo" },
            { id: "giza", textAr: "الجيزة", textFr: "Giza" },
            { id: "alex", textAr: "الإسكندرية", textFr: "Alexandria" },
            { id: "delta", textAr: "الدلتا", textFr: "Delta" },
            { id: "upper_egypt", textAr: "الصعيد", textFr: "Upper Egypt" },
            { id: "other", textAr: "محافظة تانية", textFr: "Other Governorate" }
          ]
        },
        {
          id: "style",
          type: "radio",
          questionAr: "إيه الستايل المفضل ليك؟",
          questionFr: "Eh el style el mofadal leek?",
          options: [
            { id: "streetwear", textAr: "ستريت وير (Streetwear)", textFr: "Streetwear" },
            { id: "casual", textAr: "كاجوال (Casual)", textFr: "Casual" },
            { id: "classic", textAr: "كلاسيك / فورمال", textFr: "Classic / Formal" },
            { id: "sporty", textAr: "سبورتي", textFr: "Sporty" },
            { id: "boho", textAr: "بوهيمي / فني", textFr: "Boho / Artsy" }
          ]
        }
      ]
    },
    {
      id: "struggle",
      titleAr: "القسم الأول: الـ Struggle الحقيقي",
      titleFr: "Section 1: El Struggle El Ha2i2i",
      questions: [
        {
          id: "q1",
          type: "radio",
          questionAr: "لما بتيجي في دماغك فكرة طقم معين، إيه أول حاجة بتعملها؟",
          questionFr: "Lama bteegy fee demaghak fekret ta2m mo3ayan, eh awel 7aga bte3melha?",
          options: [
            { id: "wardrobe", textAr: "بقلب في دولابي وخلاص.", textFr: "Ba2aleb fee dolaby w khalas." },
            { id: "pinterest", textAr: "بفتح Pinterest أدور على إلهام.", textFr: "Bafta7 Pinterest adawar 3ala elham." },
            { id: "malls", textAr: "بنزل ألف في المولات.", textFr: "Banzel alef fel malls." },
            { id: "instagram", textAr: "بفتح إنستجرام أشوف البلوجرز.", textFr: "Bafta7 Instagram ashof el bloggers." }
          ]
        },
        {
          id: "q2",
          type: "radio",
          questionAr: "إيه أكتر حاجة بتخليك 'تكنسل' شراء أوردر أونلاين في آخر لحظة؟",
          questionFr: "Eh aktar 7aga betkhaleek 'tekansel' shera order online fee akher la7za?",
          options: [
            { id: "size_fear", textAr: "خايف المقاس ميطلعش مظبوط (الرعب الأبدي).", textFr: "Khayef el ma2as maytla3sh mazboot (El ro3b el abady)." },
            { id: "shipping", textAr: "مصاريف الشحن مبالغ فيها.", textFr: "Masareef el sha7n mobalegh feeha." },
            { id: "fake_pics", textAr: "الصور شكلها 'فيك' ومش مبينة تفاصيل الخامة.", textFr: "El sowar shaklaha 'fake' w mesh mbayena tafaseel el khama." },
            { id: "styling", textAr: "مش متخيل القطعة دي هتليق على إيه عندي.", textFr: "Mesh motakhayel el 2et3a de hatlee2 3ala eh 3andy." }
          ]
        },
        {
          id: "q3",
          type: "radio",
          questionAr: "بصراحة، عندك كام قطعة في الدولاب 'مركونة' مبلبتسهاش غير مرة واحدة أو ولا مرة؟",
          questionFr: "Be sara7a, 3andak kam 2et3a fel dolab 'markona' mabtelbeshash gheir mara wa7da aw wala mara?",
          options: [
            { id: "none", textAr: "ولا قطعة، أنا اقتصادي جداً.", textFr: "Wala 2et3a, ana ektosady gidan." },
            { id: "1_5", textAr: "من 1 لـ 5 قطع.", textFr: "Men 1 le 5 2eta3." },
            { id: "more_5", textAr: "أكتر من 5 قطع (فلوس مرمية على الأرض 💸).", textFr: "Aktar men 5 2eta3 (Floos marmya 3al ard 💸)." },
            { id: "graveyard", textAr: "الدولاب كله عبارة عن مقبرة هدوم.", textFr: "El dolab kolo 3ebara 3an ma2baret hodoom." }
          ]
        }
      ]
    },
    {
      id: "features",
      titleAr: "القسم الثاني: المميزات اللي 'ناقصة'",
      titleFr: "Section 2: El Features Elly 'Na2sa'",
      questions: [
        {
          id: "q4",
          type: "radio",
          questionAr: "لو في 'عفريت' 🧞‍♂️ ممكن يحققلك أمنية واحدة في أبليكيشن لبس، تختار إيه؟",
          questionFr: "Law fee '3afreet' 🧞‍♂️ momken ye7a2a2lak omneya wa7da fee application lebs, tekhtar eh?",
          options: [
            { id: "try_on", textAr: "أجرب اللبس عليا افتراضياً (Virtual Try-On) قبل ما أشتريه.", textFr: "Agarab el lebs 3alaya Virtual (Virtual Try-On) abl ma ashtereeh." },
            { id: "stylist", textAr: "حد يقولي ألبس إيه النهاردة من دولابي عشان مكسل أفكر.", textFr: "7ad ye2olly albes eh elnaharda men dolaby 3ashan mkassel afakar." },
            { id: "sell", textAr: "أبيع لبسي القديم بضغطة زرار وآخد فلوسه كاش أو خصم.", textFr: "Abee3 lebsy el adeem be daghtet zorar w akhood feloso cash aw khasm." },
            { id: "brands", textAr: "ألاقي كل البراندات المصرية في مكان واحد بدل ما أتوه في الإنستجرام.", textFr: "Ala2y kol el brands el masrya fee makan wa7ed badal ma atoh fel Instagram." }
          ]
        },
        {
          id: "q5",
          type: "radio",
          questionAr: "إيه رأيك في فكرة إن الـ AI هو اللي يختارلك لبسك؟",
          questionFr: "Eh ra2yak fee fekret en el AI howa elly yekhtarlak lebsak?",
          options: [
            { id: "love_it", textAr: "جامد! أنا بثق في التكنولوجيا أكتر من ذوقي ساعات.", textFr: "Gamed! Ana baseq fel technology aktar men zo2y sa3at." },
            { id: "maybe", textAr: "ممكن أجرب، بس لازم يكون ليا التاتش بتاعي.", textFr: "Momken agarab, bas lazem ykon leya el touch beta3y." },
            { id: "hate_it", textAr: "لا يا عم، الروبوتات مش هتفهم في الشياكة زي البشر.", textFr: "La ya 3am, el robots mesh hatefham fel shyaka zay el bashar." }
          ]
        },
        {
          id: "q6",
          type: "radio",
          questionAr: "بالنسبة للـ 'Pre-loved' (اللبس المستعمل)، إيه اللي بيمنعك تشتري أو تبيع عليه؟",
          questionFr: "Belnesba lel 'Pre-loved' (El lebs el most3mal), eh elly bymn3ak teshtery aw tebee3 3aleih?",
          options: [
            { id: "hygiene", textAr: "'القرف' (النظافة والتعقيم).", textFr: "'El 2araf' (El nadafa wel ta3qeem)." },
            { id: "stigma", textAr: "'الكسوف' (نظرة المجتمع).", textFr: "'El kosoof' (Nazret el mogtama3)." },
            { id: "logistics", textAr: "'المشوار' (مفيش طريقة سهلة للتوصيل والاستلام).", textFr: "'El meshwar' (Mafeesh tare2a sahla lel tawseel wel estelam)." },
            { id: "no_prob", textAr: "معنديش مشكلة، أنا دايس في الوكالة أصلاً.", textFr: "Ma3andeesh moshkela, ana dayes fel wekala aslan." }
          ]
        }
      ]
    },
    {
      id: "persona",
      titleAr: "القسم الثالث: التجربة الشخصية",
      titleFr: "Section 3: El Tagroba El Shakhseya",
      questions: [
        {
          id: "q7",
          type: "radio",
          questionAr: "لما بتنزل تشتري لبس، مين الـ 'Influencer' بتاعك الحقيقي؟",
          questionFr: "Lama btenzel teshtery lebs, meen el 'Influencer' beta3ak el 7a2i2i?",
          options: [
            { id: "friends", textAr: "أصحابي والـ الشلة.", textFr: "As7aby wel shela." },
            { id: "social", textAr: "تيك توك وإنستجرام تريندز.", textFr: "TikTok w Instagram Trends." },
            { id: "mom", textAr: "ماما (ربنا يخليها بس ذوقنا مختلف).", textFr: "Mama (Rabena yekhaleeha bas zo2na mokhtaleef)." },
            { id: "self", textAr: "دماغي وبس.", textFr: "Demaghy w bas." }
          ]
        },
        {
          id: "q8",
          type: "radio",
          questionAr: "بتصرف تقريباً كام في الشهر على اللبس؟ (محدش هيعرف غيرنا 😉)",
          questionFr: "Betesref ta2reeban kam fel shahr 3ala el lebs? (Ma7adesh hay3raf gherna 😉)",
          options: [
            { id: "low", textAr: "أقل من 1000 جنيه (بنحاول نعيش).", textFr: "A2al men 1000 EGP (Ben7awel ne3eesh)." },
            { id: "mid", textAr: "من 1000 لـ 3000 جنيه.", textFr: "Men 1000 le 3000 EGP." },
            { id: "high", textAr: "أكتر من 3000 جنيه (ربنا يزيدك).", textFr: "Aktar men 3000 EGP (Rabena yzeedak)." }
          ]
        }
      ]
    }
  ],
  outro: {
    titleAr: "شكراً يا نجم/نجمة! ❤️",
    titleFr: "Shokran ya Negm/Negma! ❤️",
    bodyAr: "رأيك ده هيفرق معانا جداً في بناء Outfred اللي بتحلم بيه. استنى مفاجآت قريب!",
    bodyFr: "Ra2yak dah hayefre2 ma3ana gidan fee bena2 Outfred elly bet7lam beeh. Estana mofag2at o3'ayeb!"
  }
};