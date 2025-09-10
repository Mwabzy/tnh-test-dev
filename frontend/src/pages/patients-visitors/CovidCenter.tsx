import Heading from '@/components/Heading'
import { FC } from 'react'

type CovidCenterProps = object

const CovidCenter: FC<CovidCenterProps> = () => {
  return <div>
    <Heading
      image_url="https://cms.thenairobihosp.org/uploads/covid_center_8fbeb1073c.jpg"
      style="image"
      title="COVID-19 Center"
      description="Explore our dedicated COVID-19 center for comprehensive care and support."
    />
  </div>
}

export default CovidCenter