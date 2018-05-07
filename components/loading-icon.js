import { Motion, spring, presets } from 'react-motion'

export default props => (
  <Motion defaultStyle={{scale: 0}} style={{scale: spring(1, presets.wobbly)}}>
    {({ scale }) => (
      <svg
        version='1.1'
        x='0px'
        y='0px'
        width='40px'
        height='40px'
        viewBox='0 0 50 50'
        style={{ enableBackground: 'new 0 0 50 50', transform: `scale(${scale})` }}
        xmlSpace='preserve'
      >
        <path
          fill='#000'
          d='M41.326 34.593c5.159-8.936 2.098-20.362-6.839-25.521-8.935-5.16-20.362-2.098-25.521 6.838l3.523 2.034c4.035-6.99 12.974-9.385 19.964-5.35 6.99 4.037 9.386 12.975 5.35 19.965l3.523 2.034z'
        >
          <animateTransform
            attributeType='xml'
            attributeName='transform'
            type='rotate'
            from='0 25 25'
            to='360 25 25'
            dur='0.6s'
            repeatCount='indefinite'
          />
        </path>
      </svg>
    )}
  </Motion>
)
