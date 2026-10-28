import { sql } from '@/db';

async function getVeriler() {
  try {
    const bolumler = await sql`SELECT * FROM podcast_bolumleri ORDER BY id ASC`;
    const sezonlar = await sql`SELECT * FROM podcast_sezonlari ORDER BY id ASC`;
    const yoneticilerListesi = await sql`SELECT * FROM yoneticiler ORDER BY id ASC`;
    const ihlaller = await sql`SELECT * FROM ihlal_kayitlari ORDER BY id ASC`;
    
    return { bolumler, sezonlar, yoneticilerListesi, ihlaller };
  } catch (error) {
    console.error('Veriler çekilirken hata oluştu:', error);
    return { bolumler: [], sezonlar: [], yoneticilerListesi: [], ihlaller: [] };
  }
}

export default async function Home() {
  const { bolumler, sezonlar, yoneticilerListesi, ihlaller } = await getVeriler();

  // İletişim formu Server Action
  async function mesajGonder(formData: FormData) {
    'use server';
    const adSoyad = formData.get('adSoyad') as string;
    const eposta = formData.get('eposta') as string;
    const mesaj = formData.get('mesaj') as string;

    if (adSoyad && eposta && mesaj) {
      try {
        await sql`
          INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj)
          VALUES (${adSoyad}, ${eposta}, ${mesaj})
        `;
      } catch (err) {
        console.error('Mesaj kaydedilemedi:', err);
      }
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-16">
        
        {/* Profil / Başlık Alanı */}
        <div className="border-b border-gray-800 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Cansu Akkaya
          </h1>
          <p className="text-xl text-cyan-400 font-medium mb-2">
            Manisa Celal Bayar Üniversitesi - Büyük Veri Analitiği
          </p>
          <p className="text-gray-400 text-sm">
            Büyük veri, analitik, veritabanı yönetimi ve modern web teknolojileri proje paneli.
          </p>
        </div>

        {/* 1. Podcast Bölümleri */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">🎙️ Podcast Bölümlerim</h2>
          <div className="grid gap-4">
            {bolumler.length > 0 ? (
              bolumler.map((bolum: any) => (
                <div key={bolum.id} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white">{bolum.baslik}</h3>
                    <p className="text-gray-400 text-sm">
                      {bolum.konuk ? `Konuk: ${bolum.konuk}` : 'Konuksuz'} • {bolum.sure_dk} dk • Dinlenme: {bolum.dinlenme}
                    </p>
                  </div>
                  {bolum.ses_url && (
                    <a href={bolum.ses_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-medium text-sm transition">
                      Dinle →
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">Kayıt bulunamadı.</p>
            )}
          </div>
        </div>

        {/* 2. Podcast Sezonları */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">📂 Podcast Sezonları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sezonlar.length > 0 ? (
              sezonlar.map((sezon: any) => (
                <div key={sezon.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <h3 className="font-bold text-cyan-400">{sezon.ad}</h3>
                  <p className="text-gray-400 text-sm">Yıl: {sezon.yil || 'Belirtilmemiş'}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Sezon kaydı bulunamadı.</p>
            )}
          </div>
        </div>

        {/* 3. Yöneticiler ve 4. İhlal Kayıtları (Admin & Sistem Bilgileri) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-200">🛡️ Sistem Yöneticileri</h2>
            <div className="space-y-3">
              {yoneticilerListesi.map((yonetici: any) => (
                <div key={yonetici.id} className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm">
                  <span className="font-bold text-white">{yonetici.kadi}</span> — <span className="text-cyan-400">{yonetici.rol}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-200">⚠️ İhlal Kayıtları</h2>
            <div className="space-y-3">
              {ihlaller.length > 0 ? (
                ihlaller.map((ihlal: any) => (
                  <div key={ihlal.id} className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-gray-300">
                    {ihlal.aciklama}
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-gray-500">
                  Kayıtlı ihlal bulunmuyor.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 5. İletişim Mesajları Formu */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-gray-200">✉️ İletişim ve Geri Bildirim</h2>
          <p className="text-gray-400 text-sm mb-6">Gönderdiğiniz mesajlar doğrudan <code className="text-cyan-400">iletisim_mesajlari</code> tablosuna kaydedilir.</p>
          
          <form action={mesajGonder} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ad Soyad</label>
              <input type="text" name="adSoyad" required placeholder="Adınız Soyadınız" className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-700 text-white focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">E-posta</label>
              <input type="email" name="eposta" required placeholder="ornek@mail.com" className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-700 text-white focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Mesajınız</label>
              <textarea name="mesaj" rows={3} required placeholder="Mesajınız..." className="w-full px-4 py-2 rounded-lg bg-black border border-zinc-700 text-white focus:outline-none focus:border-cyan-500"></textarea>
            </div>
            <button type="submit" className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-semibold transition">
              Mesajı Kaydet
            </button>
          </form>
        </div>

      </div>

      {/* Alt Bilgi */}
      <footer className="max-w-4xl mx-auto w-full mt-20 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>Manisa Celal Bayar Üniversitesi - Büyük Veri Analitiği | İletişim: <a href="mailto:cansuakkaya80@gmail.com" className="text-cyan-400 hover:underline">cansuakkaya80@gmail.com</a></p>
      </footer>
    </main>
  );
}