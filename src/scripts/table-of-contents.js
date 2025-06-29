// Table of Contents functionality

// Generate table of contents from headings
function generateTableOfContents() {
  const tocContainer = document.querySelector('.table-of-contents');
  const tocList = document.querySelector('.toc-list');
  const blogContainer = document.querySelector('.blog-container');
  const headings = document.querySelectorAll('.blog-content h2, .blog-content h3, .blog-content h4');
  
  if (!tocList || !headings.length) {
    if (tocContainer) tocContainer.style.display = 'none';
    if (blogContainer) blogContainer.classList.add('no-toc');
    return;
  }
  
  // Remove no-toc class if TOC exists
  if (blogContainer) blogContainer.classList.remove('no-toc');

  // Clear existing TOC
  tocList.innerHTML = '';

  headings.forEach((heading, index) => {
    // Create ID if it doesn't exist
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    a.className = `toc-${heading.tagName.toLowerCase()}`;
    
    li.appendChild(a);
    tocList.appendChild(li);

    // Smooth scroll with offset
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const headerOffset = 100; // Adjust this value for desired spacing
      const elementPosition = heading.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Update active TOC item based on scroll position
function updateActiveTocItem() {
  const headings = document.querySelectorAll('.blog-content h2, .blog-content h3, .blog-content h4');
  const tocLinks = document.querySelectorAll('.toc-list a');
  
  if (!headings.length || !tocLinks.length) return;

  const scrollTop = window.scrollY + 100; // Offset for better UX
  let activeHeading = null;

  // Find the current heading
  headings.forEach((heading) => {
    if (heading.offsetTop <= scrollTop) {
      activeHeading = heading;
    }
  });

  // Update active state
  tocLinks.forEach((link) => {
    link.classList.remove('active');
    if (activeHeading && link.getAttribute('href') === `#${activeHeading.id}`) {
      link.classList.add('active');
    }
  });
}

// Initialize table of contents functionality
function initTableOfContents() {
  generateTableOfContents();
  updateActiveTocItem();
}

// Export functions for use in other modules
export { generateTableOfContents, updateActiveTocItem, initTableOfContents };