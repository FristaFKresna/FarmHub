import React from 'react'
// import Loading from './../components/Loading'
import Axios from 'axios'
import Loading from '../components/Loading'


export default class SearchImdb extends React.Component{
    state={
        movie: [],
    }

    // componentDidMount=()=>{
    //     this.getDataMovies()
                
    // }

    // getDataMovies = (param) => {
    
    //     Axios.get('http://www.omdbapi.com/?apikey=1088cac9&s=' + param)
    //     .then((res)=>{
    //         console.log(res)
    //         this.setState({movie:res.data.Search})
    //         console.log(this.state.movie)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })

    // }

    onSearchBtnClick=()=>{
        let search = this.refs.search.value
        if(search.includes(' ')){
            search = search.replace(' ', '+')
        }
        // this.getDataMovies(search)

        if(search !== ''){
        Axios.get('http://www.omdbapi.com/?apikey=1088cac9&s=' + search)
        .then((res)=>{
            console.log(res)
            this.setState({movie:res.data.Search})
            console.log(this.state.movie)
        })
        .catch((err)=>{
            console.log(err)
        })
        }
        
        
      
    }

    // cantFindMovie = () => {
    //     if(this.state.movie === undefined)
    //         <h3>Can't Find Movie</h3>
        
    // }


    printMovies=()=>{
                   
            let output = this.state.movie.map((val,index)=>{
                return(
                    <div key={index} className="my-card col-sm-2 mr-3 mt-3">
                        <img style={{height:'70%',objectFit:'cover', objectPosition:'top'}} src={val.Poster} width='100%' alt="broken"/>
                        <div className='farmhub-product-title'>{val.Title}</div>
                        <div className='farmhub-product-price'>{val.Year}</div>
                        <div className='farmhub-product-location'>{val.Type}</div>
                    </div>
                )
            })
    
            return output        
    }

    render(){
        if(this.state.movie === null){
            return (
                <Loading/>
            )
        }

        return(
            <div className="container text-center my-3">
                <h3>Page Latihan Search IMDB</h3>
                <div className="row justify-content-center my-3">
                    <div className="col-sm-6">
                        <input type='text' placeholder='search' className="form-control" ref='search'/>
                    </div>
                    <span className='btn btn-outline-primary' onClick={this.onSearchBtnClick}>Search</span>
                </div>


                {/* bikin card */}
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        {this.state.movie === undefined ? 
                        <h3>Can't Find Movie</h3> 
                        : this.printMovies()}
                    </div>
                </div>
            </div>
        )
    }
}