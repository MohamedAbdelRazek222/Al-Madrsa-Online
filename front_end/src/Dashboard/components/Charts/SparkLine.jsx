import React from 'react'
import {SparklineComponent,Inject,SparklineTooltip} from '@syncfusion/ej2-react-charts'
import { DataSource } from '@syncfusion/ej2-diagrams'

const SparkLine = ({id,height,width,color,data,type,currentColor}) => {
  return (
    <SparklineComponent id={id} height={height} width={width} LineWidth={1} valueType="Numeric" fill={color} border={{color:currentColor,width:2}} dataSource={data} xName="x" yName='yval' type={type} tooltipSettings={{visible:true,format:'${x} : ${yval}',trackLineSettings:{visible:true}}}>
      <Inject services={[SparklineTooltip]}/>
    </SparklineComponent>
  )
}


/*
`${data.map(element => {
    return element.x})}:data ${data.map(element => {
    return element.yval})} `
 */

export default SparkLine