import articles from './articles'

export function getArticles() {
  return articles
}

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug) || null
}
