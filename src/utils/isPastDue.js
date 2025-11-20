export const isPastDue = (dateString) => {
    if (!dateString) return false;

    // Backend'den gelen YYYY-MM-DD formatını Date objesine çevir
    const taskDate = new Date(dateString);
    
    // Bugünün tarihini al ve saat/dakika/saniyeyi sıfırla ki sadece gün karşılaştırılsın
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    // Görev tarihi, bugünden kesinlikle küçükse (yani geçmişte kalmışsa)
    return taskDate.getTime() < today.getTime();
};