export const SITE_CONTACT = {
  phoneDisplay: "(27) 99935-1626",
  whatsappNumber: "5527999351626",
  address: "Rua Paulo Cesar Lira, 106 - Alecrim, Vila Velha - ES, 29118-115, Brasil",
  mapsQuery: "Rua Paulo Cesar Lira, 106, Alecrim, Vila Velha - ES, 29118-115, Brasil",
  reference: "Atrás do Supermercado Economia",
  defaultWhatsAppMessage: "Olá, vim do site da VERTICAL COR e quero mais informações."
};

export const buildWhatsAppLink = (message = SITE_CONTACT.defaultWhatsAppMessage) =>
  `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
