import '../components/global-styles/playground.css'
import NextSEO from 'next-seo'

import Button from '../components/button'
import SectionHeader from '../components/section-header'
import Toggle from '../components/toggle'
import Image from '../components/image'
import CaseStudySlider from '../components/case-study-slider'
import CaseStudySliderData from '../components/case-study-slider/data'
import VerticalTextBlockList from '../components/vertical-text-block-list'
import VerticalTextBlockListData from '../components/vertical-text-block-list/data'
import Footer from '../components/footer'

const Index = () => (
  <div>
    <NextSEO
      config={{
        title: 'Index Page',
        description: 'A short description goes here.',
      }}
    />
    <h3>Next.js Component Library 🙌🏼</h3>

    <ul>
      <li>
        <h6>Button</h6>
        <Button title="Testing" url="#" />
      </li>
      <li>
        <h6>Section header</h6>
        <SectionHeader
          headline="This is a headline"
          description="now for a **really** long description of some *text* that you might never read"
          use_h1={true}
        />
      </li>
      <li>
        <h6>Toggle</h6>
        <Toggle />
      </li>
      <li>
        <h6>Image</h6>
        <p>Picture element</p>
        <Image
          src="https://www.datocms-assets.com/2885/1538142087-ye-endahl.jpg"
          alt="Test image"
          aspect_ratio={[16, 9, 501]}
          params={{ blur: 80 }}
        />
        <Image
          src="https://www.datocms-assets.com/2885/1538142087-ye-endahl.jpg"
          alt="Test image"
          aspect_ratio={[20, 1, 200]}
        />
        <p>SVG</p>
        <Image
          src="https://www.datocms-assets.com/2885/1524097005-adobe-black-1.svg"
          alt="Test SVG image"
          svg={true}
        />
      </li>
      <li>
        <h6>Case study slider</h6>
        <CaseStudySlider data={CaseStudySliderData} />
      </li>
      <li>
        <h6>Vertical Text Block List</h6>
        <VerticalTextBlockList data={VerticalTextBlockListData} />
      </li>
    </ul>

    <p>optimized image loader</p>
    <img src={require('../assets/img/chungus.jpg')} />

    <p>environment variable reflection</p>
    <p>{JSON.stringify(process.env)}</p>

    <Footer />
  </div>
)

export default Index
