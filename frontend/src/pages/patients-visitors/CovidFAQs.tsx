import Heading from '@/components/Heading'
import { FC } from 'react'

type CovidFAQsProps = object

const CovidFAQs: FC<CovidFAQsProps> = () => {
  return <div>
    <Heading
      image_url="https://cms.thenairobihosp.org/uploads/covid_faqs_8fbeb1073c.jpg"
      style="image"
      title="COVID-19 FAQs"
      description="Frequently asked questions about COVID-19 and our response."
    />
  </div>
}

export default CovidFAQs