const navContainer = document.getElementById('nav-container');
const searchInput = document.getElementById('search');
const themeToggle = document.getElementById('theme-toggle');
const addBtn = document.getElementById('add-link-btn');

// 渲染导航
function renderNavigation(data) {
  navContainer.innerHTML = '';
  data.categories.forEach(category => {
    const catDiv = document.createElement('div');
    catDiv.className = 'category';
    const catTitle = document.createElement('h2');
    catTitle.textContent = category.name;
    catDiv.appendChild(catTitle);

    category.links.forEach(link => {
      const linkEl = document.createElement('a');
      linkEl.href = link.url;
      linkEl.target = '_blank';
      linkEl.className = 'link-item';
      const icon = document.createElement('img');
      icon.src = `images/icons/${link.icon}`;
      icon.alt = link.name;
      linkEl.appendChild(icon);
      const name = document.createElement('span');
      name.textContent = link.name;
      linkEl.appendChild(name);
      catDiv.appendChild(linkEl);
    });
    navContainer.appendChild(catDiv);
  });
}

// 读取本地 JSON
fetch('data/navigation.json')
  .then(res => res.json())
  .then(data => renderNavigation(data));

// 搜索功能
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll('.link-item').forEach(link => {
    link.style.display = link.textContent.toLowerCase().includes(query) ? 'flex' : 'none';
  });
});

// 切换主题
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// 添加网址功能
addBtn.addEventListener('click', () => {
  const category = document.getElementById('new-category').value.trim();
  const name = document.getElementById('new-name').value.trim();
  const url = document.getElementById('new-url').value.trim();
  const icon = document.getElementById('new-icon').value.trim() || 'default.png';

  if(!category || !name || !url) { alert('请填写完整信息！'); return; }

  let catDiv = Array.from(document.querySelectorAll('.category')).find(c => c.querySelector('h2').textContent === category);
  if(!catDiv) {
    catDiv = document.createElement('div');
    catDiv.className = 'category';
    const catTitle = document.createElement('h2');
    catTitle.textContent = category;
    catDiv.appendChild(catTitle);
    navContainer.appendChild(catDiv);
  }

  const linkEl = document.createElement('a');
  linkEl.href = url;
  linkEl.target = '_blank';
  linkEl.className = 'link-item';
  const iconEl = document.createElement('img');
  iconEl.src = `images/icons/${icon}`;
  iconEl.alt = name;
  linkEl.appendChild(iconEl);
  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;
  linkEl.appendChild(nameSpan);
  catDiv.appendChild(linkEl);

  // 保存到 localStorage
  const savedLinks = JSON.parse(localStorage.getItem('userLinks') || '[]');
  savedLinks.push({category, name, url, icon});
  localStorage.setItem('userLinks', JSON.stringify(savedLinks));

  document.getElementById('new-category').value='';
  document.getElementById('new-name').value='';
  document.getElementById('new-url').value='';
  document.getElementById('new-icon').value='';
});

// 加载本地保存的链接
window.addEventListener('load', () => {
  const savedLinks = JSON.parse(localStorage.getItem('userLinks') || '[]');
  savedLinks.forEach(link => {
    let catDiv = Array.from(document.querySelectorAll('.category')).find(c => c.querySelector('h2').textContent === link.category);
    if(!catDiv) {
      catDiv = document.createElement('div');
      catDiv.className = 'category';
      const catTitle = document.createElement('h2');
      catTitle.textContent = link.category;
      catDiv.appendChild(catTitle);
      navContainer.appendChild(catDiv);
    }
    const linkEl = document.createElement('a');
    linkEl.href = link.url;
    linkEl.target = '_blank';
    linkEl.className = 'link-item';
    const iconEl = document.createElement('img');
    iconEl.src = `images/icons/${link.icon}`;
    iconEl.alt = link.name;
    linkEl.appendChild(iconEl);
    const nameSpan = document.createElement('span');
    nameSpan.textContent = link.name;
    linkEl.appendChild(nameSpan);
    catDiv.appendChild(linkEl);
  });
});
