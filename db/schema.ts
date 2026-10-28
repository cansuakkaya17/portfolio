import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

// 1. Podcast Sezonları Tablosu
export const podcastSezonlari = pgTable('podcast_sezonlari', {
  id: serial('id').primaryKey(),
  ad: text('ad').notNull(),
  yil: integer('yil'),
});

// 2. Podcast Bölümleri Tablosu
export const podcastBolumleri = pgTable('podcast_bolumleri', {
  id: serial('id').primaryKey(),
  baslik: text('baslik').notNull(),
  konuk: text('konuk'),
  sureDk: integer('sure_dk'),
  dinlenme: integer('dinlenme'),
  sesUrl: text('ses_url'),
});

// 3. İletişim Mesajları Tablosu
export const iletisimMesajlari = pgTable('iletisim_mesajlari', {
  id: serial('id').primaryKey(),
  adSoyad: text('ad_soyad').notNull(),
  eposta: text('eposta').notNull(),
  mesaj: text('mesaj').notNull(),
  tarih: timestamp('tarih').defaultNow(),
});

// 4. Yöneticiler Tablosu
export const yoneticiler = pgTable('yoneticiler', {
  id: serial('id').primaryKey(),
  kadi: text('kadi').notNull(),
  rol: text('rol').notNull(),
});

// 5. İhlal Kayıtları Tablosu
export const ihlalKayitlari = pgTable('ihlal_kayitlari', {
  id: serial('id').primaryKey(),
  aciklama: text('aciklama').notNull(),
  tarih: timestamp('tarih').defaultNow(),
});