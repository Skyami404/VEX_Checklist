import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function exportChecklistToPDF(title, items, checked) {
  const completedItems = items.map((item, index) => {
    return `<li>${checked[index] ? '✅' : '⬜️'} ${item}</li>`;
  }).join('');

  const html = `
    <html>
      <body>
        <h1>${title}</h1>
        <ul>${completedItems}</ul>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri);
  } else {
    alert('Sharing is not available on this device');
  }
}