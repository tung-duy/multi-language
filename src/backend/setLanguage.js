export default function (req, res, next) {
  const lng = req.headers['content-language'] || 'vi';
  req.i18n.changeLanguage(lng);
  return next();
}