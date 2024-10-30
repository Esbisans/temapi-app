export const avatars = Array.from({ length: 21 }, (_, index) => ({
    id: index,
    source: `/assets/avatars/avatar-${index}.jpg`,
    label: `avatar ${index}`
  }));