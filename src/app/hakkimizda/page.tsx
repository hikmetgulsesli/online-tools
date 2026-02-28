import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda - Online Araçlar",
  description: "Online Araçlar hakkında bilgi edinin. Ücretsiz web araçları sunan platformumuzun misyonu ve vizyonu.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
          Hakkımızda
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Online Araçlar, günlük dijital ihtiyaçlarınızı karşılamak için tasarlanmış 
            ücretsiz web araçları platformudur. 2024 yılında kurulan platformumuz, 
            kullanıcılarına kayıt olmadan, hızlı ve güvenli bir şekilde çeşitli 
            dijital araçlar sunmayı amaçlamaktadır.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            Misyonumuz
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            İnternet kullanıcılarına kaliteli, ücretsiz ve kullanımı kolay araçlar 
            sunarak dijital işlemlerini daha verimli hale getirmek. Teknolojiyi 
            herkes için erişilebilir kılmak ve kullanıcılarımızın zamanını 
            değerli kılmak en önemli önceliğimizdir.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            Vizyonumuz
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Türkiye&apos;nin en güvenilir ve tercih edilen online araçlar platformu 
            olmak. Sürekli gelişen teknoloji ile birlikte kullanıcılarımıza 
            yenilikçi çözümler sunmak ve dijital dünyada faydalı bir kaynak 
            olmaktır.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            Değerlerimiz
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Gizlilik:</strong> Kullanıcı verilerinin güvenliği bizim için en üst düzeydedir. İşlemleriniz tarayıcınızda gerçekleşir.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Şeffaflık:</strong> Açık kaynak kodlu projeler ve açık iletişim ile kullanıcılarımıza güven veriyoruz.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Erişilebilirlik:</strong> Tüm araçlarımız ücretsiz ve kayıtsız kullanıma açıktır.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span><strong className="text-foreground">Kalite:</strong> Her aracımız en yüksek kalite standartlarında geliştirilir ve test edilir.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
            İletişim
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Sorularınız, önerileriniz veya geri bildirimleriniz için 
            <a href="/iletisim" className="text-primary hover:underline cursor-pointer">iletişim sayfamızdan</a>{" "}
            bize ulaşabilirsiniz. Kullanıcılarımızın görüşleri, platformumuzu 
            geliştirmemizde bize yol gösterir.
          </p>
        </div>
      </div>
    </div>
  );
}
