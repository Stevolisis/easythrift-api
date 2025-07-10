// Date range filter helper
exports.getDateFilter = (range) => {
    const now = new Date();
    switch(range) {
      case 'day': return new Date(now.setDate(now.getDate()-1));
      case 'week': return new Date(now.setDate(now.getDate()-7));
      case 'month': return new Date(now.setMonth(now.getMonth()-1));
      default: return new Date(0);
    }
};