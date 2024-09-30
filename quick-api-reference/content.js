(async () => {
  try {
    // Sends a message to the service worker and receives a tip in response
    const { tip } = await chrome.runtime.sendMessage({ greeting: 'tip' });

    // Log the entire document to understand its structure
    console.log('Document structure:', document.documentElement.outerHTML);

    // Attempt to find the navigation element
    const nav = document.querySelector('.upper-tabs > nav');
    if (!nav) {
      console.error('Navigation element not found');
      return;
    }

    const tipWidget = createDomElement(`
      <button type="button" popovertarget="tip-popover" popovertargetaction="show" style="padding: 0 12px; height: 36px;">
        <span style="display: block; font: var(--devsite-link-font,500 14px/20px var(--devsite-primary-font-family));">Tip</span>
      </button>
    `);

    const popover = createDomElement(
      `<div id='tip-popover' popover style="margin: auto;">${tip}</div>`
    );

    document.body.append(popover);
    nav.append(tipWidget);
  } catch (error) {
    console.error('Error in content script:', error);
  }
})();

function createDomElement(html) {
  const dom = new DOMParser().parseFromString(html, 'text/html');
  return dom.body.firstElementChild;
}