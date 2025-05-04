import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: {
          home: 'Home',
          features: 'Features',
          vendors: 'Vendors',
          account: 'Account',
          certification: 'Certification',
          about: 'About Us'
        },
        home: {
          hero: {
            title: "Ethical Halal Commerce Redefined",
            subtitle: "Connecting conscious consumers with certified vendors globally",
            explore: "Explore Marketplace"
          },
          features: {
            title: "Why Choose HalaIChain?",
            certified: "Certified Vendors",
            certified_desc: "Rigorous Halal certification process with blockchain verification",
            ethical: "Ethical Sourcing",
            ethical_desc: "Transparent supply chains meeting Islamic ethical standards",
            global: "Global Access",
            global_desc: "Source halal products from 100+ countries"
          },
          vendors: {
            title: "Featured Certified Vendors",
            see_all: "See All Vendors"
          },
          certification: {
            title: "3-Step Certification Process",
            step1: "Submit Documentation",
            step2: "Blockchain Verification",
            step3: "Get Certified",
            cta: "Verify Certification"
          }
        }
      }
    },
    ar: {
      translation: {
        nav: {
          home: 'الرئيسية',
          features: 'المميزات',
          vendors: 'البائعون',
          account: 'الحساب',
          certification: 'الشهادات',
          about: 'من نحن'
        },
        home: {
          hero: {
            title: "تجارة حلال أخلاقية معاد تعريفها",
            subtitle: "ربط المستهلكين الواعيين مع البائعين المعتمدين عالميًا",
            explore: "استكشف السوق"
          },
          features: {
            title: "لماذا تختار HalaIChain؟",
            certified: "بائعون معتمدون",
            certified_desc: "عملية اعتماد حلال صارمة مع التحقق من سلسلة الكتل",
            ethical: "التوريد الأخلاقي",
            ethical_desc: "سلاسل توريد شفافة تفي بالمعايير الأخلاقية الإسلامية",
            global: "وصول عالمي",
            global_desc: "استيراد منتجات حلال من أكثر من 100 دولة"
          },
          vendors: {
            title: "البائعون المعتمدون المميزون",
            see_all: "عرض جميع البائعين"
          },
          certification: {
            title: "عملية اعتماد من 3 خطوات",
            step1: "تقديم الوثائق",
            step2: "التحقق عبر سلسلة الكتل",
            step3: "الحصول على الشهادة",
            cta: "التحقق من الشهادة"
          }
        }
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;