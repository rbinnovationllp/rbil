import http from 'node:http';

const widths = [320, 360, 375, 390, 430];
const baseUrl = 'http://127.0.0.1:4173/';
const cdpPort = Number(process.env.CDP_PORT || 9222);

function request(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port: cdpPort, path, method }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
}

function send(ws, id, method, params = {}) {
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) {
        return;
      }
      ws.removeEventListener('message', onMessage);
      if (message.error) {
        reject(new Error(JSON.stringify(message.error)));
        return;
      }
      resolve(message.result);
    };
    ws.addEventListener('message', onMessage);
  });
}

const measureScript = (language, width) => `
(() => {
  const hero = document.querySelector('.hero');
  const heading = document.querySelector('.hero h1');
  const lead = document.querySelector('.hero .lead');
  const header = document.querySelector('.site-header');
  const rect = (element) => {
    const box = element.getBoundingClientRect();
    return {
      width: Math.round(box.width),
      height: Math.round(box.height),
      top: Math.round(box.top),
      bottom: Math.round(box.bottom)
    };
  };
  return {
    language: '${language}',
    width: ${width},
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    header: rect(header),
    hero: rect(hero),
    heading: rect(heading),
    lead: rect(lead),
    headingFont: getComputedStyle(heading).fontSize,
    leadFont: getComputedStyle(lead).fontSize,
    headingText: heading.innerText
  };
})()
`;

async function main() {
  const tab = JSON.parse(await request(`/json/new?${baseUrl}`, 'PUT'));
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

  let id = 1;
  await send(ws, id++, 'Page.enable');
  await send(ws, id++, 'Runtime.enable');

  const results = [];

  for (const language of ['en', 'hi']) {
    for (const width of widths) {
      await send(ws, id++, 'Emulation.setDeviceMetricsOverride', {
        width,
        height: 860,
        deviceScaleFactor: 2,
        mobile: true,
      });
      await send(ws, id++, 'Page.navigate', { url: baseUrl });
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (language === 'hi') {
        await send(ws, id++, 'Runtime.evaluate', {
          expression: "document.querySelector('.language-switcher button[aria-label=\"Switch to Hindi\"]')?.click()",
        });
        await new Promise((resolve) => setTimeout(resolve, 250));
      }

      const measured = await send(ws, id++, 'Runtime.evaluate', {
        expression: measureScript(language, width),
        returnByValue: true,
      });
      results.push(measured.result.value);
    }
  }

  console.table(results.map(({ language, width, overflow, hero, heading, lead, headingFont, leadFont }) => ({
    language,
    width,
    overflow,
    heroHeight: hero.height,
    headingHeight: heading.height,
    leadHeight: lead.height,
    headingFont,
    leadFont,
  })));

  const failed = results.filter((result) => result.overflow);
  if (failed.length > 0) {
    console.error('Horizontal overflow detected:', failed);
    process.exitCode = 1;
  }

  ws.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
