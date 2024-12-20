export function extractId(str: any) {
    const id = str.split('_')[1];
    return id;
}