import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

const Layout: React.FC<{
  title?: string
  date?: string
  image?: string
  desc?: string
  type?: string
  hero?: boolean
}> = ({ image, date, title, desc, type }) => {
  const router = useRouter()

  return (
    <NextSeo
      title={title || `Indent`}
      description={desc || `Markdown editor thing made for fun`}
      canonical={`https:/jcde.xyz${router.asPath}`}
      openGraph={{
        type: type,
        url: `https://indent.jcde.xyz${router.asPath}`,
        title: title || `Indent`,
        article: { publishedTime: date },

        description: desc || `Markdown editor thing made for fun`,
        site_name: title || `Indent`,
        images: [
          {
            url: image || ``,
          },
        ],
      }}
      twitter={{
        cardType: `summary_large_image`,
      }}
    />
  )
}

export default Layout
