import { APIListResponse } from "@/types/common";
import { Medicine } from "@/types/medcines";

export const PRODUCT_LISTING_PAGE: APIListResponse<Medicine> = {
  status: "success",
  results: 13,
  content: [
    {
      id: "sgfmbovcx-23435",
      nameAr: "بانادول كولد اند فلو النهاري",
      nameEn: "Panadol Cold and Flu Day",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 3.5,
      manufacturer: "GSK",
      price: 28.85,
      beforeDiscount: 32.8,
      tag: "HOT",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/spohxo.png",
      descriptionAr:
        "هذا الدواء يُستخدم للمساعدة في تخفيف الأعراض المرتبطة بالحساسية مثل العطس، سيلان الأنف، وحكة العينين. يتميز بتركيبة فعّالة تعمل على تهدئة الجهاز التنفسي وتقليل الالتهابات الناتجة عن ردود الفعل التحسسية. يحتوي على مكونات آمنة ومعتمدة طبيًا، ويمكن تناوله وفقًا لتعليمات الطبيب أو الصيدلي. يُفضل تناوله بانتظام للحصول على أفضل النتائج، مع مراعاة شرب كمية كافية من الماء. هذا المنتج مناسب للبالغين والأطفال فوق سن معينة، ويجب حفظه في مكان بارد وجاف بعيدًا عن أشعة الشمس المباشرة والرطوبة.",
      descriptionEn:
        "A gentle herbal-based shampoo enriched with natural extracts designed to cleanse the hair and scalp while maintaining their natural balance. It helps reduce dryness, leaving hair soft, shiny, and easy to style. Suitable for daily use for all hair types. Free from harsh chemicals, making it safe even for sensitive scalps. Packed with vitamins to promote healthy growth and restore strength to damaged hair strands. Its light fragrance offers a refreshing feel after every wash. Dermatologically tested for maximum safety and quality. Ideal for those seeking a natural, nourishing hair care routine that supports long-term hair health and vitality.",
      indicationsAr:
        "يستخدم لتخفيف الألم والحمى الناتجة عن نزلات البرد أو الإنفلونزا.",
      indicationsEn: "Used to relieve pain and fever caused by cold or flu.",
      concentration: ["1mg", "0.5mg", "2mg", "5mg", "10mg"],
      dosageAr: "تناول قرص واحد كل 8 ساعات بعد الأكل.",
      dosageEn: "Take one tablet every 8 hours after meals.",
    },
    {
      id: "sgfmbovcx-23436",
      nameAr: "فولتارين جل",
      nameEn: "Voltaren Gel",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.2,
      manufacturer: "Novartis",
      price: 45,
      beforeDiscount: 50,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/vaporub.png",
      descriptionAr:
        "دواء فعال يُستخدم لتخفيف آلام المعدة والحرقة الناتجة عن زيادة حموضة المعدة. يعمل عن طريق معادلة الأحماض الزائدة وحماية بطانة المعدة من التهيج. يتميز بفعاليته السريعة في توفير الراحة وتحسين الهضم. يُنصح باستخدامه بعد الوجبات أو عند ظهور الأعراض، مع مراعاة الالتزام بالجرعات الموصى بها من قبل الطبيب. لا يُنصح باستخدامه لفترات طويلة دون استشارة طبية. مناسب للبالغين وقد يُستخدم للأطفال وفقًا لإرشادات الطبيب. يُحفظ في مكان جاف وبارد بعيدًا عن متناول الأطفال.",
      descriptionEn:
        "A moisturizing face cream formulated with a blend of natural oils and advanced hydrating agents to deeply nourish the skin. It helps reduce signs of dryness, flakiness, and irritation, restoring a soft and smooth texture. Suitable for all skin types, including sensitive skin, thanks to its gentle, non-greasy formula. Contains antioxidants to protect against environmental damage and promote a youthful appearance. Absorbs quickly without leaving residue, making it perfect for daily use under makeup or alone. Dermatologically tested for safety and quality. Ideal for anyone seeking an effective, long-lasting moisturizer for radiant, healthy-looking skin.",
      concentration: ["250mg", "500mg", "750mg", "1g"],
      indicationsAr: "يستخدم لعلاج الالتهابات البكتيرية في الجهاز التنفسي.",
      indicationsEn:
        "Used to treat bacterial infections in the respiratory tract.",
      dosageAr: "ملعقة صغيرة ثلاث مرات يومياً قبل الوجبات.",
      dosageEn: "One teaspoon three times daily before meals.",
    },
    {
      id: "sgfmbovcx-23437",
      nameAr: "كونجستال أقراص",
      nameEn: "Congestal Tablets",
      category: {
        id: "2",
        nameAr: "نزلات البرد",
        nameEn: "Cold & Flu",
      },
      rating: 4,
      manufacturer: "Delta Pharma",
      price: 18.5,
      beforeDiscount: 20,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/benylyn.png",
      descriptionAr:
        "هذا المنتج يُستخدم لتخفيف السعال الجاف والمستمر من خلال تهدئة الحلق وتقليل تهيج مجرى الهواء. يحتوي على مكونات تساعد على تخفيف الالتهاب وتسهيل التنفس. مناسب للاستعمال خلال النهار أو الليل، ولا يسبب النعاس في معظم الحالات. يمكن تناوله مع أو بدون طعام، مع ضرورة الالتزام بالجرعات المحددة. يُنصح بمراجعة الطبيب إذا استمرت الأعراض لأكثر من أسبوع. يُحفظ الدواء بعيدًا عن الحرارة والرطوبة، وبعيدًا عن أيدي الأطفال للحفاظ على سلامته.",
      descriptionEn:
        "An effective multivitamin supplement designed to support overall health and wellness. It contains essential vitamins and minerals that help boost energy levels, strengthen immunity, and promote healthy skin, hair, and nails. Ideal for individuals with nutritional gaps due to busy lifestyles or dietary restrictions. Each tablet is easy to swallow and formulated for optimal absorption, ensuring maximum benefit. Free from artificial colors and preservatives, making it suitable for long-term use. Recommended for daily intake as part of a balanced diet. Packaged in a convenient bottle for easy storage and travel use.",
      concentration: ["5ml", "10ml", "15ml", "30ml", "60ml"],
      indicationsAr: "يساعد في تقليل الالتهاب والتورم في المفاصل.",
      indicationsEn: "Helps reduce inflammation and swelling in joints.",
      dosageAr: "كبسولة واحدة مرتين يومياً مع كوب ماء كامل.",
      dosageEn: "One capsule twice daily with a full glass of water.",
    },
    {
      id: "sgfmbovcx-23438",
      nameAr: "بروفين 400 مجم",
      nameEn: "Brufen 400mg",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.5,
      manufacturer: "Abbott",
      price: 32,
      beforeDiscount: 35,
      tag: "HOT",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/chest-eze.png",
      descriptionAr:
        "دواء يُستخدم لتخفيف أعراض نزلات البرد مثل انسداد الأنف، العطس، الصداع، والحمى الخفيفة. يحتوي على مكونات مضادة للاحتقان وخافضة للحرارة. يوفر راحة سريعة ويساعد على استعادة النشاط اليومي. يُفضل تناوله بعد الطعام لتجنب اضطرابات المعدة. مناسب للبالغين والأطفال بجرعات محددة يحددها الطبيب. لا يُنصح باستخدامه مع أدوية أخرى تحتوي على نفس المكونات لتجنب الجرعة الزائدة. يجب حفظه في مكان جاف وبارد، بعيدًا عن أشعة الشمس المباشرة.",
      descriptionEn:
        "A refreshing herbal tea blend crafted from high-quality natural ingredients, offering a soothing taste and numerous health benefits. It supports digestion, reduces bloating, and promotes relaxation after meals. Naturally caffeine-free, making it suitable for consumption at any time of the day. Rich in antioxidants that help protect the body from free radicals. Easy to prepare and perfect for a calming tea break. Its aromatic fragrance and gentle flavor provide a comforting experience with every sip. Packaged in sealed bags to preserve freshness and quality for longer periods.",
      concentration: ["100mg", "200mg", "400mg", "800mg"],
      indicationsAr: "يعمل على تخفيف أعراض الحساسية مثل العطس والحكة.",
      indicationsEn: "Relieves allergy symptoms such as sneezing and itching.",
      dosageAr: "قرص واحد عند اللزوم لتخفيف الألم، بحد أقصى 4 أقراص يومياً.",
      dosageEn:
        "One tablet as needed for pain, not exceeding 4 tablets per day.",
    },
    {
      id: "sgfmbovcx-23439",
      nameAr: "إيموكس 500 مجم",
      nameEn: "Amox 500mg",
      category: {
        id: "3",
        nameAr: "مضاد حيوي",
        nameEn: "Antibiotic",
      },
      rating: 4.3,
      manufacturer: "GlaxoSmithKline",
      price: 42.75,
      beforeDiscount: 48,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/chesty.png",
      descriptionAr:
        "هذا المكمل الغذائي غني بالفيتامينات والمعادن الأساسية التي تدعم صحة الجسم وتعزز المناعة. يُستخدم لتعويض النقص الغذائي وتحسين مستويات الطاقة والنشاط. يمكن تناوله مرة يوميًا أو حسب إرشادات الطبيب. مناسب لجميع الفئات العمرية مع تعديل الجرعة للأطفال. يُفضل تناوله مع وجبة لتعزيز الامتصاص. لا يُستخدم كبديل عن نظام غذائي صحي ومتوازن. يُحفظ بعيدًا عن الحرارة والرطوبة، وفي عبوة مغلقة بإحكام للحفاظ على جودة المنتج.",
      descriptionEn:
        "A gentle baby lotion formulated to keep delicate skin soft, smooth, and hydrated throughout the day. Enriched with natural moisturizers and soothing extracts to prevent dryness and irritation. Absorbs quickly without leaving any greasy residue, making it ideal for daily use after bath time. Free from harsh chemicals, parabens, and artificial fragrances, ensuring safety for newborns and infants. Dermatologically tested and approved by pediatricians. Helps maintain the skin’s natural protective barrier while providing a subtle, calming scent. Perfect for keeping your baby’s skin healthy and comfortable in all seasons.",
      concentration: ["50mg", "100mg", "150mg", "200mg"],
      indicationsAr: "يستخدم كخافض للحرارة ومسكن للصداع.",
      indicationsEn: "Used as an antipyretic and headache reliever.",
      dosageAr: "20 نقطة بالفم مرتين يومياً.",
      dosageEn: "20 drops orally twice daily.",
    },
    {
      id: "sgfmbovcx-23441",
      nameAr: "ديكساميثازون أمبول",
      nameEn: "Dexamethasone Ampoule",
      category: {
        id: "4",
        nameAr: "كورتيكوستيرويد",
        nameEn: "Corticosteroid",
      },
      rating: 4.6,
      manufacturer: "Amoun",
      price: 15,
      beforeDiscount: 18,
      tag: "NEW",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/humex.png",
      descriptionAr:
        "دواء مسكن للآلام وخافض للحرارة، فعال في حالات الصداع، آلام العضلات، آلام الأسنان، وأعراض البرد. يعمل عن طريق تثبيط المواد المسببة للألم في الجسم. يمكن تناوله مع الطعام أو بدونه. يُنصح بعدم تجاوز الجرعة المقررة لتجنب الآثار الجانبية. مناسب للبالغين والأطفال وفق إرشادات الجرعة. لا يُستخدم لفترات طويلة دون استشارة الطبيب. يُحفظ في مكان بارد وجاف بعيدًا عن متناول الأطفال.",
      descriptionEn:
        "A nourishing lip balm enriched with natural oils and waxes to keep lips soft, smooth, and hydrated. Protects against dryness, cracking, and chapping caused by harsh weather conditions. Lightweight and non-sticky formula makes it comfortable to wear all day. Infused with vitamins and antioxidants to support healthy lip skin. Available in a compact, travel-friendly container for easy application anywhere. Suitable for daily use for both men and women. Free from artificial colors and synthetic fragrances, ensuring a natural care experience.",
      concentration: ["0.25mg", "0.5mg", "1mg", "2mg"],
      indicationsAr: "يستخدم لعلاج العدوى الفطرية في الجلد.",
      indicationsEn: "Used to treat fungal infections of the skin.",
      dosageAr: "استنشاق الجرعة المحددة مرتين يومياً.",
      dosageEn: "Inhale the prescribed dose twice daily.",
    },
    {
      id: "sgfmbovcx-23442",
      nameAr: "ريفو أقراص",
      nameEn: "Rivo Tablets",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4,
      manufacturer: "CID Pharma",
      price: 10.5,
      beforeDiscount: 12,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/benylyn.png",
      descriptionAr:
        "هذا الدواء يُستخدم كمضاد حيوي واسع الطيف للقضاء على البكتيريا المسببة للعدوى في الجهاز التنفسي، الجلد، أو المسالك البولية. يعمل على وقف نمو البكتيريا ومنع انتشارها. يجب الالتزام بالجرعة وفترة العلاج المقررة حتى لو تحسنت الأعراض لتجنب مقاومة البكتيريا. قد يسبب آثارًا جانبية بسيطة مثل اضطراب المعدة أو الإسهال. يُحفظ في مكان بارد وجاف وبعيدًا عن الضوء المباشر.",
      descriptionEn:
        "A fast-absorbing hand sanitizer formulated with a high percentage of alcohol to effectively kill germs and bacteria. Enriched with moisturizing agents to prevent dryness and keep hands soft. Leaves no sticky residue and has a pleasant, fresh scent. Suitable for frequent use at home, in the office, or while traveling. Packaged in a convenient bottle for easy dispensing. Dermatologically tested for safety and efficiency. An essential hygiene product for maintaining cleanliness and reducing the spread of infections.",
      concentration: ["300mg", "600mg", "900mg"],
      indicationsAr: "يساعد على خفض ضغط الدم المرتفع.",
      indicationsEn: "Helps lower high blood pressure.",
      dosageAr: "كيس واحد يذاب في نصف كوب ماء مرة واحدة يومياً.",
      dosageEn: "Dissolve one sachet in half a cup of water once daily.",
    },
    {
      id: "sgfmbovcx-23443",
      nameAr: "فينادون شراب",
      nameEn: "Fenadone Syrup",
      category: {
        id: "5",
        nameAr: "مضاد حساسية",
        nameEn: "Antihistamine",
      },
      rating: 4.4,
      manufacturer: "Memphis",
      price: 22,
      beforeDiscount: 25,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/chest-eze.png",
      descriptionAr:
        "دواء مضاد للالتهاب غير ستيرويدي يُستخدم لتخفيف الألم والالتهاب الناتج عن الإصابات أو أمراض المفاصل. يعمل عن طريق تقليل إنتاج المواد المسببة للالتهاب في الجسم. مناسب للاستخدام القصير المدى وفقًا لتعليمات الطبيب. يجب تناوله بعد الطعام لتقليل تهيج المعدة. قد يسبب بعض الآثار الجانبية مثل الغثيان أو حرقة المعدة. يُحفظ بعيدًا عن الحرارة والرطوبة.",
      descriptionEn:
        "A premium toothpaste formulated to promote oral health and fresh breath. Contains fluoride to strengthen tooth enamel and protect against cavities. Helps remove plaque and surface stains for a brighter smile. Gentle on gums while delivering effective cleaning results. Refreshing mint flavor provides a long-lasting clean feeling. Suitable for daily use for the whole family. Free from harsh abrasives and artificial sweeteners, ensuring a safe and pleasant brushing experience. Packaged in a hygienic tube to preserve freshness.",
      concentration: ["1g", "2g", "4g"],
      indicationsAr: "يستخدم لعلاج السعال الجاف والمستمر.",
      indicationsEn: "Used to treat dry and persistent cough.",
      dosageAr: "ملعقتان كبيرتان بعد كل وجبة.",
      dosageEn: "Two tablespoons after each meal.",
    },
    {
      id: "sgfmbovcx-23444",
      nameAr: "أوجمنتين 1جم",
      nameEn: "Augmentin 1g",
      category: {
        id: "3",
        nameAr: "مضاد حيوي",
        nameEn: "Antibiotic",
      },
      rating: 4.7,
      manufacturer: "GSK",
      price: 85,
      beforeDiscount: 90,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/chesty.png",
      descriptionAr:
        "هذا الشراب يُستخدم لتخفيف الكحة المصاحبة للبلغم عن طريق إذابة المخاط وتسهيل طرده. يحتوي على مواد فعّالة تساعد على تنظيف مجرى التنفس وتحسين التنفس. مناسب للبالغين والأطفال مع تعديل الجرعة حسب العمر. يُفضل تناوله بعد الوجبات. يجب شرب كمية كافية من السوائل أثناء فترة العلاج. يُحفظ في مكان بارد وجاف بعيدًا عن أشعة الشمس.",
      descriptionEn:
        "An energizing shower gel enriched with natural extracts to cleanse and refresh the skin. Produces a rich lather that removes impurities without stripping moisture. Leaves skin soft, smooth, and delicately scented. Suitable for all skin types and daily use. Dermatologically tested for safety. Ideal for a revitalizing shower experience in the morning or after exercise. Free from harsh chemicals and artificial dyes, making it gentle enough for sensitive skin.",
      concentration: ["5mg", "10mg", "20mg", "40mg"],
      indicationsAr: "يساعد على تنظيم مستوى السكر في الدم.",
      indicationsEn: "Helps regulate blood sugar levels.",
      dosageAr: "نصف قرص مرة واحدة يومياً قبل النوم.",
      dosageEn: "Half a tablet once daily before bedtime.",
    },
    {
      id: "sgfmbovcx-23445",
      nameAr: "إيبوبروفين شراب",
      nameEn: "Ibuprofen Syrup",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.2,
      manufacturer: "Pfizer",
      price: 18,
      beforeDiscount: 20,
      tag: "NEW",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/humex.png",
      descriptionAr:
        "دواء يُستخدم لتخفيف أعراض الحساسية الموسمية أو المزمنة مثل حكة الجلد، العطس، وسيلان الأنف. يحتوي على مضاد للهستامين يقلل من التفاعل التحسسي. يمكن تناوله مرة واحدة يوميًا ويفضل في المساء إذا سبب النعاس. مناسب للبالغين والأطفال بجرعات محددة. يُحفظ في مكان جاف وبارد بعيدًا عن متناول الأطفال.",
      descriptionEn:
        "A soothing eye cream designed to reduce puffiness, dark circles, and fine lines. Contains a blend of natural extracts, antioxidants, and peptides to nourish the delicate skin around the eyes. Lightweight and fast-absorbing formula makes it perfect for use under makeup or alone. Dermatologically and ophthalmologically tested for safety. Helps improve skin elasticity and promote a refreshed, youthful look. Suitable for daily morning and evening application.",
      concentration: ["15ml", "30ml", "50ml", "100ml"],
      indicationsAr: "يستخدم لعلاج التهابات الأذن الوسطى.",
      indicationsEn: "Used to treat middle ear infections.",
      dosageAr: "جرعة واحدة عن طريق الحقن كل أسبوع.",
      dosageEn: "One injection dose weekly.",
    },
    {
      id: "sgfmbovcx-23446",
      nameAr: "ميوكوسول شراب",
      nameEn: "Mucosol Syrup",
      category: {
        id: "6",
        nameAr: "طارد بلغم",
        nameEn: "Expectorant",
      },
      rating: 4.1,
      manufacturer: "Amoun",
      price: 19.5,
      beforeDiscount: 22,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/mucosolban.png",
      descriptionAr:
        "هذا الدواء يحتوي على تركيبة فعّالة تساعد في التخفيف من الأعراض المرتبطة بالحساسية والاحتقان. يتميز بسرعة الامتصاص في الجسم ويمنح شعورًا بالراحة خلال وقت قصير. مناسب للاستخدام اليومي حسب إرشادات الطبيب أو الصيدلي، ويُحفظ في مكان جاف بعيدًا عن متناول الأطفال. تم تطويره بمعايير جودة عالية لضمان فعاليته وأمانه على المدى الطويل، ويُفضل تناوله بعد الطعام لتقليل أي اضطرابات في المعدة.",
      descriptionEn:
        "A vitamin C serum designed to brighten skin tone and improve overall texture. Contains a high concentration of vitamin C to promote collagen production and fight signs of aging. Helps fade dark spots and enhance radiance. Lightweight, non-greasy formula absorbs quickly, making it ideal for daily use under moisturizer or sunscreen. Suitable for all skin types. Dermatologically tested to ensure safety and effectiveness.",
      concentration: ["250mg", "500mg"],
      indicationsAr: "يساعد على تقوية العظام ومنع هشاشتها.",
      indicationsEn: "Helps strengthen bones and prevent osteoporosis.",
      dosageAr: "5 مل ثلاث مرات يومياً.",
      dosageEn: "5 ml three times daily.",
    },
    {
      id: "sgfmbovcx-23447",
      nameAr: "سيتريزين أقراص",
      nameEn: "Cetirizine Tablets",
      category: {
        id: "5",
        nameAr: "مضاد حساسية",
        nameEn: "Antihistamine",
      },
      rating: 4.5,
      manufacturer: "Tabuk Pharma",
      price: 15,
      beforeDiscount: 18,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/panadol.png",
      descriptionAr:
        "كبسولات مصممة بعناية لتوفير دعم فعّال للجهاز الهضمي وتحسين الامتصاص الغذائي. تحتوي على مكونات طبيعية مختارة بعناية وتعمل على تعزيز التوازن البكتيري في الأمعاء. يمكن استخدامها ضمن نمط حياة صحي للحفاظ على نشاط الجسم وحيويته. تم تصنيع المنتج وفق أعلى معايير الجودة لضمان الفعالية والأمان، مع ضرورة الالتزام بالجرعة المحددة لتجنب أي آثار جانبية.",
      descriptionEn:
        "A natural cough syrup formulated with herbal extracts to soothe throat irritation and reduce coughing. Free from artificial colors and alcohol, making it safe for both adults and children. Helps provide relief from common cold symptoms while supporting the immune system. Pleasant taste makes it easy to take. Packaged in a sealed bottle to preserve quality and freshness.",
      concentration: ["20mg", "40mg", "80mg"],
      indicationsAr: "يستخدم للتخفيف من آلام الدورة الشهرية.",
      indicationsEn: "Used to relieve menstrual pain.",
      dosageAr: "قطرة واحدة في كل عين مرتين يومياً.",
      dosageEn: "One drop in each eye twice daily.",
    },
    {
      id: "sgfmbovcx-23448",
      nameAr: "باراسيتامول 500 مجم",
      nameEn: "Paracetamol 500mg",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.3,
      manufacturer: "Memphis",
      price: 14,
      beforeDiscount: 16,
      tag: "HOT",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/paracetamol.png",
      descriptionAr:
        "شراب طبي فعّال يساهم في تهدئة السعال الجاف والمصحوب بالبلغم، مما يساعد على تحسين عملية التنفس. يحتوي على مكونات مهدئة ولطيفة على الحلق، ويعمل على إذابة المخاط لتسهيل طرده. مناسب للأطفال والبالغين مع ضرورة الالتزام بتعليمات الاستخدام. يُحفظ في درجة حرارة الغرفة وبعيدًا عن أشعة الشمس المباشرة لضمان الحفاظ على فعاليته.",
      descriptionEn:
        "A rich hair conditioner infused with nourishing oils to soften and detangle hair. Helps restore shine, reduce frizz, and strengthen strands. Suitable for daily use on all hair types. Free from sulfates and parabens, ensuring gentle care for sensitive scalps. Leaves hair smooth, manageable, and healthy-looking. Dermatologically tested and safe for color-treated hair.",
      concentration: ["125mg", "250mg", "500mg"],
      indicationsAr: "يعمل على تحسين وظائف الكبد.",
      indicationsEn: "Helps improve liver function.",
      dosageAr: "قرصين يومياً صباحاً ومساءً.",
      dosageEn: "Two tablets daily, morning and evening.",
    },
    {
      id: "sgfmbovcx-23449",
      nameAr: "كولد فري أقراص",
      nameEn: "Cold Free Tablets",
      category: {
        id: "2",
        nameAr: "نزلات البرد",
        nameEn: "Cold & Flu",
      },
      rating: 4.1,
      manufacturer: "Delta Pharma",
      price: 17.5,
      beforeDiscount: 19,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/coldfree.png",
      descriptionAr:
        "أقراص مسكّنة للألم وخافضة للحرارة تحتوي على مكونات فعّالة للتخفيف السريع من الصداع وآلام العضلات والمفاصل. يمكن استخدامها أيضًا لتقليل أعراض الحمى المصاحبة لنزلات البرد أو الإنفلونزا. تمتاز بسهولة البلع وسرعة الامتصاص في الجسم. يُوصى بعدم تجاوز الجرعة الموصى بها وتجنب استخدامها لفترات طويلة دون استشارة طبية.",
      descriptionEn:
        "An advanced sunscreen lotion offering broad-spectrum protection against harmful UVA and UVB rays. Lightweight, non-greasy formula absorbs quickly without leaving a white cast. Water-resistant for up to 80 minutes, making it ideal for outdoor activities. Enriched with antioxidants to protect against environmental damage. Suitable for all skin types and daily use.",
      concentration: ["10mg", "25mg", "50mg"],
      indicationsAr: "يستخدم لعلاج الإمساك المزمن.",
      indicationsEn: "Used to treat chronic constipation.",
      dosageAr: "ضع طبقة رقيقة على المنطقة المصابة مرتين يومياً.",
      dosageEn: "Apply a thin layer to the affected area twice daily.",
    },
    {
      id: "sgfmbovcx-23450",
      nameAr: "سيبروباي 500 مجم",
      nameEn: "Ciprobay 500mg",
      category: {
        id: "3",
        nameAr: "مضاد حيوي",
        nameEn: "Antibiotic",
      },
      rating: 4.4,
      manufacturer: "Bayer",
      price: 55,
      beforeDiscount: 60,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/ciprobay.png",
      descriptionAr:
        "مرهم موضعي يستخدم لتخفيف آلام العضلات والمفاصل الناتجة عن الإجهاد أو الإصابات البسيطة. يحتوي على مكونات تمنح إحساسًا بالبرودة ثم الدفء مما يساعد على تنشيط الدورة الدموية في المنطقة المصابة. يُستخدم خارجيًا فقط مع ضرورة غسل اليدين جيدًا بعد الاستخدام. يُحفظ بعيدًا عن العيون والجروح المفتوحة.",
      descriptionEn:
        "A gentle baby shampoo enriched with natural ingredients to cleanse without causing irritation. Tear-free formula ensures a comfortable bath time experience. Helps maintain the scalp’s natural moisture balance while leaving hair soft and shiny. Free from sulfates, parabens, and artificial fragrances, ensuring safety for newborns and infants.",
      concentration: ["5mg", "15mg", "25mg"],
      indicationsAr: "يساعد على تحسين التركيز والانتباه.",
      indicationsEn: "Helps improve focus and attention.",
      dosageAr: "جرعة واحدة بالفم قبل ساعة من النوم.",
      dosageEn: "One oral dose an hour before sleep.",
    },
    {
      id: "sgfmbovcx-23451",
      nameAr: "بريدنيزولون أقراص",
      nameEn: "Prednisolone Tablets",
      category: {
        id: "4",
        nameAr: "كورتيكوستيرويد",
        nameEn: "Corticosteroid",
      },
      rating: 4,
      manufacturer: "Amoun",
      price: 12.5,
      beforeDiscount: 15,
      tag: "NEW",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/prednisolone.png",
      descriptionAr:
        "مكمل غذائي غني بالفيتامينات والمعادن الأساسية لدعم الطاقة وتعزيز المناعة. يساعد في تحسين الأداء البدني والذهني خاصة في فترات الإجهاد أو نقص التغذية. مناسب للبالغين وكبار السن، ويُفضل تناوله مع وجبة متوازنة. تم تصنيعه بجودة عالية لضمان أقصى استفادة من مكوناته. يُخزن في مكان بارد وجاف.",
      descriptionEn:
        "An herbal digestive aid designed to support healthy digestion and reduce bloating. Contains natural plant extracts known for their soothing properties. Suitable for daily use after meals. Free from artificial colors, preservatives, and synthetic additives. Packaged in a secure container to preserve freshness.",
      concentration: ["100ml", "200ml", "500ml"],
      indicationsAr: "يستخدم للحد من التوتر والقلق.",
      indicationsEn: "Used to reduce stress and anxiety.",
      dosageAr: "كبسولة واحدة بعد وجبة الإفطار يومياً.",
      dosageEn: "One capsule daily after breakfast.",
    },
    {
      id: "sgfmbovcx-23452",
      nameAr: "كلاريتين شراب",
      nameEn: "Clarityne Syrup",
      category: {
        id: "5",
        nameAr: "مضاد حساسية",
        nameEn: "Antihistamine",
      },
      rating: 4.6,
      manufacturer: "Bayer",
      price: 34,
      beforeDiscount: 38,
      tag: "HOT",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/clarityne.png",
      descriptionAr:
        "قطرات للأنف مصممة لفتح المجاري الأنفية وتخفيف الاحتقان بسرعة. تحتوي على تركيبة لطيفة تقلل من التهيج وتساعد على التنفس بحرية. يمكن استخدامها لفترات قصيرة حسب إرشادات الطبيب. يُفضل عدم الإفراط في الاستخدام لتجنب جفاف الأغشية المخاطية. تُحفظ بعيدًا عن متناول الأطفال.",
      descriptionEn:
        "A soothing body lotion enriched with aloe vera and natural oils to provide deep hydration. Helps relieve dryness, improve skin texture, and restore softness. Lightweight formula absorbs quickly without leaving greasy residue. Suitable for daily use for all skin types. Dermatologically tested for safety and quality.",
      concentration: ["0.1mg", "0.5mg", "1mg"],
      indicationsAr: "يساعد على علاج الالتهابات البولية.",
      indicationsEn: "Helps treat urinary tract infections.",
      dosageAr: "10 مل عن طريق الفم كل 12 ساعة.",
      dosageEn: "10 ml orally every 12 hours.",
    },
    {
      id: "sgfmbovcx-23453",
      nameAr: "إكسبكتوران شراب",
      nameEn: "Expectoran Syrup",
      category: {
        id: "6",
        nameAr: "طارد بلغم",
        nameEn: "Expectorant",
      },
      rating: 4.2,
      manufacturer: "Alexandria Co.",
      price: 21,
      beforeDiscount: 24,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/expectoran.png",
      descriptionAr:
        "كريم مرطب للبشرة الجافة والحساسة، غني بالمكونات الطبيعية التي توفر ترطيبًا عميقًا يدوم لساعات. يساعد على تهدئة التهيج وتقليل الاحمرار، كما يمنح البشرة ملمسًا ناعمًا ومظهرًا صحيًا. مناسب للاستخدام اليومي على الوجه والجسم. لا يحتوي على عطور قوية أو مكونات ضارة. يُخزن في درجة حرارة معتدلة.",
      descriptionEn:
        "A joint support supplement formulated with glucosamine, chondroitin, and essential vitamins to promote joint flexibility and comfort. Ideal for those experiencing stiffness or discomfort. Free from artificial colors and preservatives. Recommended for daily use as part of a healthy lifestyle.",
      concentration: ["150mg", "300mg", "450mg"],
      indicationsAr: "يستخدم لتخفيف أعراض البرد والرشح.",
      indicationsEn: "Used to relieve symptoms of cold and runny nose.",
      dosageAr: "رشة واحدة في كل فتحة أنف مرتين يومياً.",
      dosageEn: "One spray in each nostril twice daily.",
    },
    {
      id: "sgfmbovcx-23454",
      nameAr: "سيتال شراب",
      nameEn: "Cetal Syrup",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.1,
      manufacturer: "Pharco",
      price: 10,
      beforeDiscount: 12,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/cetal.png",
      descriptionAr:
        "شراب مكمل غذائي للأطفال يحتوي على فيتامينات ومعادن أساسية لنمو صحي وسليم. يتميز بطعم لطيف يسهل على الأطفال تناوله بانتظام. يساهم في دعم جهاز المناعة وتعزيز النشاط البدني والعقلي. يُستخدم حسب الجرعة الموصى بها من الطبيب أو الصيدلي. يُحفظ بعيدًا عن أشعة الشمس المباشرة.",
      descriptionEn:
        "A natural sleep aid supplement containing melatonin and calming herbal extracts. Helps promote relaxation and improve sleep quality without causing grogginess the next day. Non-addictive and suitable for occasional use. Packaged in a convenient bottle for easy use.",
      concentration: ["25ml", "50ml", "75ml"],
      indicationsAr: "يساعد على تحسين عملية الهضم.",
      indicationsEn: "Helps improve digestion.",
      dosageAr: "قرص واحد عند الشعور بأعراض البرد، بحد أقصى 3 أقراص يومياً.",
      dosageEn:
        "One tablet at the onset of cold symptoms, up to 3 tablets per day.",
    },
    {
      id: "sgfmbovcx-23455",
      nameAr: "تافيجيل أقراص",
      nameEn: "Tavegyl Tablets",
      category: {
        id: "5",
        nameAr: "مضاد حساسية",
        nameEn: "Antihistamine",
      },
      rating: 4,
      manufacturer: "Novartis",
      price: 18.5,
      beforeDiscount: 20,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/tavegyl.png",
      descriptionAr:
        "أقراص مضادة للحموضة تعمل على معادلة أحماض المعدة وتخفيف الشعور بالحرقة والانزعاج. مناسبة للاستخدام عند الحاجة أو حسب توصية الطبيب. تساعد على تحسين الهضم وتوفير راحة سريعة للمعدة. لا يُنصح باستخدامها لفترات طويلة دون استشارة مختص. تُخزن في مكان جاف وبارد.",
      descriptionEn:
        "A refreshing mouthwash designed to promote oral hygiene and fresh breath. Contains antibacterial agents to help reduce plaque and prevent gum issues. Alcohol-free formula makes it gentle on the mouth. Suitable for daily use after brushing.",
      concentration: ["200mg", "400mg", "600mg", "800mg"],
      indicationsAr: "يستخدم لعلاج حب الشباب والبثور.",
      indicationsEn: "Used to treat acne and pimples.",
      dosageAr: "كيس واحد يخلط مع العصير صباحاً.",
      dosageEn: "One sachet mixed with juice in the morning.",
    },
    {
      id: "sgfmbovcx-23456",
      nameAr: "أموكلان 1جم",
      nameEn: "Amoclan 1g",
      category: {
        id: "3",
        nameAr: "مضاد حيوي",
        nameEn: "Antibiotic",
      },
      rating: 4.5,
      manufacturer: "Pharco",
      price: 78,
      beforeDiscount: 84,
      tag: "HOT",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/amoclan.png",
      descriptionAr:
        "كبسولات عشبية طبيعية تدعم صحة الكبد وتساعد في تنقية الجسم من السموم. تحتوي على مستخلصات نباتية معروفة بخصائصها المضادة للأكسدة. يمكن استخدامها كجزء من نمط حياة صحي مع نظام غذائي متوازن. يُفضل تناولها مع الطعام للحصول على أفضل امتصاص. تُحفظ بعيدًا عن الرطوبة.",
      descriptionEn:
        "A soothing burn cream formulated to provide quick relief from minor burns and skin irritations. Contains aloe vera and natural oils to promote healing and reduce redness. Lightweight, non-greasy formula absorbs easily into the skin.",
      concentration: ["5g", "10g", "20g"],
      indicationsAr: "يساعد في تحسين جودة النوم.",
      indicationsEn: "Helps improve sleep quality.",
      dosageAr: "ملعقة صغيرة كل 6 ساعات.",
      dosageEn: "One teaspoon every 6 hours.",
    },
    {
      id: "sgfmbovcx-23457",
      nameAr: "سيدوفاج 500 مجم",
      nameEn: "Cidophage 500mg",
      category: {
        id: "7",
        nameAr: "سكري",
        nameEn: "Diabetes",
      },
      rating: 4.4,
      manufacturer: "CID Pharma",
      price: 32,
      beforeDiscount: 35,
      tag: "NEW",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/cidophage.png",
      descriptionAr:
        "محلول مضمضة فموي يساعد في الحفاظ على نظافة الفم وتقليل البكتيريا المسببة لرائحة الفم الكريهة. يحتوي على مكونات منعشة تمنح إحساسًا بالانتعاش يدوم طويلًا. مناسب للاستخدام اليومي بعد تنظيف الأسنان. لا يُنصح بابتلاعه ويجب حفظه بعيدًا عن الأطفال.",
      descriptionEn:
        "A hydrating face mask infused with natural extracts to deeply nourish and revitalize the skin. Helps restore a healthy glow and improve texture. Suitable for all skin types. Free from harsh chemicals and artificial fragrances.",
      concentration: ["0.5ml", "1ml", "2ml"],
      indicationsAr: "يستخدم لعلاج فقر الدم الناتج عن نقص الحديد.",
      indicationsEn: "Used to treat anemia caused by iron deficiency.",
      dosageAr: "حقنة عضلية كل 3 أيام.",
      dosageEn: "One intramuscular injection every 3 days.",
    },
    {
      id: "sgfmbovcx-23458",
      nameAr: "أدفيل 200 مجم",
      nameEn: "Advil 200mg",
      category: {
        id: "1",
        nameAr: "مسكن الآم",
        nameEn: "Painkiller",
      },
      rating: 4.6,
      manufacturer: "Pfizer",
      price: 29,
      beforeDiscount: 33,
      tag: null,
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/advil.png",
      descriptionAr:
        "قطرات عين مرطبة تخفف الجفاف والتهيج الناتج عن العوامل البيئية أو الاستخدام الطويل للشاشات. توفر إحساسًا فوريًا بالراحة وتساعد في حماية العين من الجفاف المستمر. مناسبة للاستخدام اليومي ولمن يرتدون العدسات اللاصقة. تُخزن في مكان بارد وجاف.",
      descriptionEn:
        "A gentle makeup remover designed to dissolve even waterproof makeup without irritating the skin. Enriched with natural oils to maintain skin moisture. Suitable for daily use and all skin types.",
      concentration: ["50mg", "75mg", "100mg"],
      indicationsAr: "يساعد على تعزيز المناعة ومقاومة العدوى.",
      indicationsEn: "Helps boost immunity and fight infections.",
      dosageAr: "كبسولتان معاً بعد وجبة الغداء.",
      dosageEn: "Two capsules together after lunch.",
    },
    {
      id: "sgfmbovcx-23459",
      nameAr: "سيتافين أقراص",
      nameEn: "Cetafen Tablets",
      category: {
        id: "2",
        nameAr: "نزلات البرد",
        nameEn: "Cold & Flu",
      },
      rating: 4.1,
      manufacturer: "Amoun",
      price: 19,
      beforeDiscount: 21,
      tag: "SALE",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/cetafen.png",
      descriptionAr:
        "بخاخ حنجرة يعمل على تهدئة آلام الحلق والتقليل من التهيج المصاحب لنزلات البرد أو الحساسية. يحتوي على مكونات طبيعية تمنح شعورًا بالراحة الفورية. سهل الاستخدام ويمكن حمله أثناء السفر. يُستخدم حسب الإرشادات المرفقة ويُحفظ بعيدًا عن الحرارة المباشرة.",
      descriptionEn:
        "A gentle makeup remover designed to dissolve even waterproof makeup without irritating the skin. Enriched with natural oils to maintain skin moisture. Suitable for daily use and all skin types.",
      concentration: ["12.5mg", "25mg", "37.5mg"],
      indicationsAr: "يساعد على تعزيز المناعة ومقاومة العدوى.",
      indicationsEn: "Helps boost immunity and fight infections.",
      dosageAr: "جرعة واحدة بالفم كل صباح على معدة فارغة.",
      dosageEn: "One oral dose every morning on an empty stomach.",
    },
    {
      id: "sgfmbovcx-23460",
      nameAr: "ليبراكس كبسولات",
      nameEn: "Librax Capsules",
      category: {
        id: "8",
        nameAr: "مهدئ",
        nameEn: "Tranquilizer",
      },
      rating: 4.3,
      manufacturer: "Pfizer",
      price: 42,
      beforeDiscount: 46,
      tag: "NEW",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/librax.png",
      descriptionAr:
        "شامبو علاجي لفروة الرأس يحتوي على مكونات مضادة للقشرة والحكة. يساعد على تنظيف الشعر بعمق وتركه منتعشًا وناعمًا. مناسب لجميع أنواع الشعر ويمكن استخدامه بانتظام. يُفضل تدليك فروة الرأس أثناء الاستخدام للحصول على أفضل النتائج. يُخزن في درجة حرارة الغرفة.",
      descriptionEn:
        "A gentle makeup remover designed to dissolve even waterproof makeup without irritating the skin. Enriched with natural oils to maintain skin moisture. Suitable for daily use and all skin types.",
      concentration: ["12.5mg", "25mg", "37.5mg"],
      indicationsAr: "يساعد على تعزيز المناعة ومقاومة العدوى.",
      indicationsEn: "Helps boost immunity and fight infections.",
      dosageAr: "جرعة واحدة بالفم كل صباح على معدة فارغة.",
      dosageEn: "One oral dose every morning on an empty stomach.",
    },
  ],
};
