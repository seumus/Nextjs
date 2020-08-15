import Head from 'next/head'
import Layout, { siteTitle , name} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

// import useSWR from 'swr'

// function Profile() {
//   const { data, error } = useSWR('/api/user', fetch)

//   if (error) return <div>failed to load</div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }
// checkout https://swr.vercel.app/
export async function getStaticProps() {
	const allPostsData = getSortedPostsData()
	return {
	  props: {
		allPostsData
	  }
	}
  }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, my name is {name.first}. I am a software engineer from Glasgow, Scotland.</p>

      </section>
	  <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
			<li className={utilStyles.listItem} key={id}>
				<Link href="/posts/[id]" as={`/posts/${id}`}>
					<a>{title}</a>
				</Link>
				<br />
				<small className={utilStyles.lightText}>
					<Date dateString={date} />
				</small>
			</li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}