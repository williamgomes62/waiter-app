import fs from 'fs';

export function convertImageUrlToBase64(imageUrl: string){
  return fs.readFileSync(imageUrl, 'base64');
}