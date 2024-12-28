export const IsLive = (open: string, close: string): boolean => {
    const actualDate = new Date();

    const openDate = new Date(open);
    const closeDate = new Date(close);

    const actualBrasiliaTime = new Date(actualDate.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    
    const openBrasiliaTime = new Date(`${openDate.getFullYear()}-${openDate.getMonth() + 1}-${openDate.getDate()}T${String(openDate.getHours() + 3).padStart(2, '0')}:${String(openDate.getMinutes()).padStart(2, '0')}:${String(openDate.getSeconds()).padStart(2, '0')}`);
    const closeBrasiliaTime = new Date(`${closeDate.getFullYear()}-${closeDate.getMonth() + 1}-${closeDate.getDate()}T${String(closeDate.getHours() + 3).padStart(2, '0')}:${String(closeDate.getMinutes()).padStart(2, '0')}:${String(closeDate.getSeconds()).padStart(2, '0')}`);

    return openBrasiliaTime <= actualBrasiliaTime && closeBrasiliaTime >= actualBrasiliaTime;
};