document.querySelectorAll('.highlight').forEach((block) => {
    const code = block.querySelector('pre code');
    if (!code) return;

    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';
    const label = document.createElement('span');
    label.className = 'code-language';
    const language = code.dataset.lang || 'Code';
    const names = { javascript: 'JavaScript', js: 'JavaScript', typescript: 'TypeScript', html: 'HTML', css: 'CSS', json: 'JSON', bash: 'Shell', sh: 'Shell' };
    const languageName = names[language] || language;
    const badges = { javascript: 'JS', js: 'JS', typescript: 'TS', bash: 'SH', sh: 'SH' };
    label.textContent = badges[language] || languageName;
    label.title = languageName;
    toolbar.append(label);

    if (navigator.clipboard && window.isSecureContext) {
        const button = document.createElement('button');
        button.className = 'code-copy';
        button.type = 'button';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy ' + languageName + ' code');
        const status = document.createElement('span');
        status.className = 'code-copy-status';
        status.setAttribute('role', 'status');
        toolbar.append(status);
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(code.textContent);
                button.textContent = 'Copied';
                status.textContent = 'Code copied';
            } catch {
                button.textContent = 'Retry';
                status.textContent = 'Could not copy. Select the code to copy manually.';
            }
            setTimeout(() => {
                button.textContent = 'Copy';
                status.textContent = '';
            }, 2000);
        });
        toolbar.append(button);
    }

    block.prepend(toolbar);
});
