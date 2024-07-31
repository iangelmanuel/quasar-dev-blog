import type { APIRoute } from "astro"
import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export const GET: APIRoute = async ({ params, request, site }) => {
  const blogPosts = await getCollection("blog")

  return rss({
    // `<title>` field in output xml
    // stylesheet: "/style/rss.xsl",
    title: "Quasar's Blog",
    // `<description>` field in output xml
    description: "A blog acerca de programación y tecnología",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: site ?? "",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPosts.map(({ data, slug }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `post/${slug}`
    })),

    // (optional) inject custom xml
    customData: `<language>es-co</language>`
  })
}
