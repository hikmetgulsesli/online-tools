import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası - Online Araçlar",
  description: "Online Araçlar gizlilik politikası. Kullanıcı verilerinin nasıl işlendiği ve korunduğu hakkında bilgi.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
          Gizlilik Politikası
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-6">
            Son güncelleme: 28 Şubat 2026
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Online Araçlar olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. 
            Bu gizlilik politikası, web sitemizi kullandığınızda hangi bilgileri topladığımızı, 
            bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            1. Veri İşleme ve Güvenlik
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Platformumuzda sunulan araçların büyük çoğunluğu, verilerinizi tarayıcınızda 
            yerel olarak işler. Bu, görselleriniz, metinleriniz veya diğer verilerinizin 
            sunucularımıza gönderilmediği anlamına gelir. Tüm işlemler cihazınızda 
            gerçekleşir ve verileriniz asla dışarıya aktarılmaz.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            2. Toplanan Bilgiler
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Web sitemizi kullandığınızda aşağıdaki bilgiler otomatik olarak toplanabilir:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>IP adresi ve tarayıcı bilgileri (güvenlik ve analiz amaçlı)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Kullanılan cihaz ve işletim sistemi bilgileri</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Web sitesi kullanım istatistikleri</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            3. Çerezler (Cookies)
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanabilir. 
            Çerezler, tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. 
            Kullandığımız çerezler şunlardır:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Zorunlu Çerezler:</strong> Web sitesinin düzgün çalışması için gereklidir.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Analitik Çerezler:</strong> Web sitesi kullanımını analiz etmek için kullanılır.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            4. Üçüncü Taraf Hizmetleri
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Web sitemizde Google AdSense reklamları gösterilebilir. Google, 
            reklamları kişiselleştirmek için çerezler kullanabilir. Google&apos;ın 
            çerez kullanımı hakkında daha fazla bilgi için 
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Gizlilik Politikası</a>&apos;nı 
            inceleyebilirsiniz.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            5. Veri Güvenliği
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kullanıcı verilerinin güvenliği bizim için en üst düzeydedir. 
            Endüstri standardı güvenlik önlemleri kullanarak verilerinizi 
            korumak için çaba gösteriyoruz. Ancak, internet üzerinden hiçbir 
            veri iletiminin %100 güvenli olmadığını lütfen unutmayın.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            6. Haklarınız
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            KVKK kapsamında aşağıdaki haklara sahipsiniz:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Kişisel verilerinizin düzeltilmesini veya silinmesini isteme</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>İşleme faaliyetlerine itiraz etme</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            7. İletişim
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Gizlilik politikamız hakkında sorularınız veya endişeleriniz varsa, 
            <a href="/iletisim" className="text-primary hover:underline cursor-pointer">iletişim sayfamızdan</a>{" "}
            bize ulaşabilirsiniz.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            8. Politika Değişiklikleri
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler 
            olduğunda bu sayfada bilgilendirme yapılacaktır. Politikayı düzenli 
            olarak kontrol etmenizi öneririz.
          </p>
        </div>
      </div>
    </div>
  );
}
