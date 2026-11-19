(() => {
  const el = id => document.getElementById('inquiry-' + id);
  const form = el('form');
  if (!form) return;
  const draft = el('draft');
  const draftText = el('draft-text');
  const open = el('open');
  const status = el('status');
  const copyStatus = el('copy-status');
  let copyBody = '';
  const topics = ['人事制度・評価・賃金', '労務管理・業務運営', 'その他の人事・労務相談'];

  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(form);
    const field = name => String(values.get(name) ?? '').trim();
    const name = field('name');
    const email = field('email');
    const topic = field('topic');
    const message = field('message').replace(/\r\n|\r|\n/g, '\r\n');
    if (!name || !email || !topics.includes(topic) || !message) {
      status.textContent = '必須項目をご確認ください。';
      return;
    }
    const recipient = form.dataset.recipient;
    const subject = '【TKS｜人事・労務のご相談】' + topic;
    const body = [
      '株式会社ティーケーシステムズ ご担当者様',
      '',
      'お名前：' + name,
      '会社名：' + (field('company') || '記載なし'),
      'メールアドレス：' + email,
      'ご相談の種類：' + topic,
      '',
      'ご相談内容',
      message
    ].join('\r\n');
    copyBody = body.replace(/\r\n/g, '\n');
    draftText.value = '宛先：' + recipient + '\n件名：' + subject + '\n\n' + copyBody;
    const url = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    if (url.length <= 6000) {
      open.href = url;
      open.textContent = 'メールアプリで開く ↗';
    } else {
      open.href = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject);
      open.textContent = '宛先と件名をメールアプリで開く ↗';
      copyStatus.textContent = '長い文面なので、本文はコピーしてメールに貼り付けてください。';
    }
    if (url.length <= 6000) copyStatus.textContent = '';
    status.textContent = '';
    draft.hidden = false;
    el('draft-title').focus();
  });

  form.addEventListener('input', () => {
    if (!draft.hidden) {
      draft.hidden = true;
      draftText.value = '';
      copyBody = '';
      open.removeAttribute('href');
      copyStatus.textContent = '';
    }
    status.textContent = '';
  });

  el('copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBody);
      copyStatus.textContent = '本文をコピーしました。';
    } catch {
      draftText.focus();
      draftText.select();
      copyStatus.textContent = '文面を選択しました。お使いの端末でコピーしてください。';
    }
  });
  form.hidden = false;
})();
