import React from "react";
import Plotly from "react-native-plotly";
import  {IPoses3D_Data, IFSC_Data} from '../utilities/interfaces'
import { useEffect, useState } from "react";
import {runOnJS, SharedValue, useAnimatedProps } from 'react-native-reanimated';
import {default as skeleton_joint_edges} from "../assets/joint_endjes.json";


export const config = {
  displayModeBar: false, // this is the line that hides the bar.
  scrollZoom: false
};


const Graphs = ({
  currentFSC_data,
}:{
  currentFSC_data: SharedValue<IFSC_Data>;
}) => {

  const initGraph = {
    x: [0],
    y: [0],
    z: [0],
}

 const [currentSkeleton, setNextSkeleton] = useState<IPoses3D_Data>(initGraph);
  const [loading, setLoading] = useState(true);
  const __JOINTS_EDGES__ =   skeleton_joint_edges.joint_edges
  const __FPS_ANIMATION__ = 8

  const isThereAPose = (
    nextFSC_Data:IFSC_Data
    ) : boolean => {
      'worklet'
      if(nextFSC_Data.poses3D){
        if(nextFSC_Data.poses3D.length > 1){
          return true
        }
      }
      return false
  }
  
  
  const getNextSkeleton = (currentFSC_data:IFSC_Data) : IPoses3D_Data | null => {
    'worklet'
    if (!isThereAPose(currentFSC_data)){
      return null
    }
    const pose3d = currentFSC_data.poses3D
    var nextSkeleton : IPoses3D_Data = {
      x: [],
      y: [],
      z: []
    }
    if (pose3d){
      __JOINTS_EDGES__.forEach((joints)=>{
        const [start, end] = joints
        nextSkeleton.x.push(-1*pose3d[start][2])
        nextSkeleton.y.push(pose3d[start][0])
        nextSkeleton.z.push(-1*pose3d[start][1])
        nextSkeleton.x.push(-1*pose3d[end][2])
        nextSkeleton.y.push(pose3d[end][0])
        nextSkeleton.z.push(-1*pose3d[end][1])
        //To disconnect the last joint from the next joint
        nextSkeleton.x.push(NaN)
        nextSkeleton.y.push(NaN)
        nextSkeleton.z.push(NaN)
      })
    }else{
      return null
    }
    return nextSkeleton;
  }

  const update = (_, { data, layout, config }, plotly) => {
    plotly.react(data, layout, config);
  };


  useAnimatedProps(() => {
    const nextSkeleton = getNextSkeleton(currentFSC_data.value)
    if (nextSkeleton){
      runOnJS(setNextSkeleton)(nextSkeleton)
    }
    return {}
  }, [currentFSC_data.value])


  return (
    <Plotly
      style={{ top: 0, borderWidth: 0, borderColor: 'green', width: 'auto' }}
      config={config}
      data={[
        {
          x: currentSkeleton.x,
          y: currentSkeleton.y,
          z: currentSkeleton.z,
          type: 'scatter3d',
          mode: 'markers+lines',
          marker: { color: 'blue' },
          scene: 'scene3',
        }
      ]}
      layout={{
        dragMode: false,
        autosize: false,
        width: "100%",
        height: "100%",
        margin:{
          b:0,
          l:0,
          r:0,
          t:0,
          autoexpand: false,
        },
        //title: 'Fancy Plot',
        scene3: {
          xaxis: {
            title: "", //graphData.masterGraph.xAxis,
            showgrid: true,
            showline: false,
            showticklabels: false,
            showbackground: false,
            //autorange: false,
            //range:[-1, 1]
          },
          yaxis: {
            title: "", //graphData.masterGraph.yAxis,
            showgrid: true,
            showline: false,
            showticklabels: false,
            showbackground: false,
            //autorange: false,
            //range:[-1, 1]
          },
          zaxis: {
            title: "", //graphData.masterGraph.zAxis,
            showgrid: false,
            showline: false,
            showticklabels: false,
            showbackground: true,
            //autorange: false,
            //range:[-1, 0]
            //zerolinecolor:"white",
          },
          domain: {
            x: [0, 0],
            y: [0, 0],
            //z: [0, 0]
          },
          camera: {
            center: { x: 0.0, y: 0.9, z: -0.1 },
            eye: { x: 2.5, y: 2.0, z: 1.0 },
            up: { x: 0, y: 0, z: 0.7 }
          }
        },
      }}
      update={update}
      onLoad={() => setLoading(false)}
      // onLoad={() => setLoading(false)}
      //debug
      enableFullPlotly
    />
  );
}

export default Graphs;
