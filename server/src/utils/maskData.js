exports.maskCard = card => `************${card.slice(-4)}`;

exports.maskPhone = (phone) => {
  const num = phone.split(' ');
  const last4 = (num[num.length - 1]).slice(-4);
  return `${num[0]} *****${last4}`;
};

exports.maskCardPan = (card) => {
  const firstSlice = card.slice(0, 7);
  const last4 = card.slice(-4);
  return `${firstSlice}*****${last4}`;
};

exports.last4 = any => any.slice(-4);
