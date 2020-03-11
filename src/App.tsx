import React from 'react';
import './App.css';

interface SectionContainer {
	scId: string,
	styles: Styles,
	text: string,
	sections: Section[],
}
interface Section {
	sId: string,
	styles: Styles,
	text: string,
}
interface Styles {
	[key: string]: string
}

interface AppState {
	data: { sectionContainers: SectionContainer[] }
}
class App extends React.Component<{}, AppState> {
	state: AppState = {
		data: {} as AppState['data']
	}

	componentDidMount () {
		fetch('/data.json').then(r => r.json()).then(data => this.setState({ data }))
	}
	render () {
		return (
			<ul className="section-container-list">
				{
					this.state.data.sectionContainers && this.state.data.sectionContainers.map(sc => <SectionContainer data={ sc } key={ sc.scId } />)
				}
			</ul>
		)
	}
}

function SectionContainer (props: { data: SectionContainer }) {
	return <li className="section-container" >
		<span style={ props.data.styles } >{ props.data.text }</span>
		<ul className="section-list" >{
			props.data.sections.map(s => <Section data={ s } key={ s.sId } />)
		}</ul>
	</li>
}

function Section(props: { data: Section }) {
	return <li className="section" style={ props.data.styles } >{ props.data.text }</li>
}

export default App;
