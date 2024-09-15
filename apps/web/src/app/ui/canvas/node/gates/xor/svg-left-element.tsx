export const PathElement1 =
  'M 1.4 0 Q 3.2 4.55 4.35 8.65 M 4.65 10.05 Q 6.1 17.05 4.15 24.05 M 3.7 25.65 Q 2.7 28.55 1.4 32';

export const PathElement2 = 'M 6.4 0 Q 8.2 4.55 9.35 8.65 M 9.65 10.05 Q 11.1 17.05 9.15 24.05 M 8.7 25.65 Q 7.7 28.55 6.4 32';

export const createSVGColouredElement = (color: `#${string}`) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); // width="7" height="32"
  svg.setAttribute('width', '12');
  svg.setAttribute('height', '32');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', PathElement1);
  path1.setAttribute('stroke', color);
  path1.setAttribute('stroke-width', '2');
  path1.setAttribute('stroke-linecap', 'square');
  path1.setAttribute('stroke-linejoin', 'miter');
  svg.appendChild(path1);
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', PathElement2);
  path2.setAttribute('stroke', color);
  path2.setAttribute('stroke-width', '2');
  path2.setAttribute('stroke-linecap', 'square');
  path2.setAttribute('stroke-linejoin', 'miter');
  svg.appendChild(path2);
  const svgString = new XMLSerializer().serializeToString(svg);
  const base64 = btoa(svgString);
  return `data:image/svg+xml;base64,${base64}`;
};
