export const addClassesToDescription = (description: string): string => {
  // Create a temporary div to parse the HTML safely
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = description;

  // ────────────────────────────────────────────────
  // Common Tailwind styling for rich text / description content
  // Feel free to adjust values to match your design system
  // ────────────────────────────────────────────────

  const tagStyles: Record<string, string[]> = {
    p: [
      'mb-4',
      'text-gray-800',
      'leading-relaxed',
    ],
    ul: [
      'mb-5',
      'pl-6',
      'list-disc',
      'marker:text-gray-500',
      'space-y-2'
    ],
    ol: [
      'mb-5',
      'pl-6',
      'list-decimal',
      'marker:text-gray-600',
      'space-y-2'
    ],
    li: [
      'text-gray-800',
      'leading-relaxed'
    ],
    h1: [
      'text-3xl',
      'font-bold',
      'mb-6',
      'mt-8',
      'text-gray-900',
      'leading-tight'
    ],
    h2: [
      'text-2xl',
      'font-bold',
      'mb-5',
      'mt-10',
      'text-gray-900',
      'leading-tight'
    ],
    h3: [
      'text-xl',
      'font-semibold',
      'mb-4',
      'mt-8',
      'text-gray-900'
    ],
    h4: [
      'text-lg',
      'font-semibold',
      'mb-3',
      'mt-6',
      'text-gray-900'
    ],
    h5: [
      'text-base',
      'font-semibold',
      'mb-2',
      'mt-5',
      'text-gray-800'
    ],
    h6: [
      'text-sm',
      'font-semibold',
      'mb-2',
      'mt-4',
      'text-gray-700',
      'uppercase',
      'tracking-wide'
    ]
  };

  // Apply classes to each tag type
  Object.entries(tagStyles).forEach(([tag, classes]) => {
    const elements = tempDiv.getElementsByTagName(tag);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(...classes);
    }
  });

  // Optional: improve nested lists spacing
  const nestedLists = tempDiv.querySelectorAll('ul ul, ol ol, ul ol, ol ul');
  nestedLists.forEach(list => {
    list.classList.add('mt-2', 'mb-2');
  });

  return tempDiv.innerHTML;
};