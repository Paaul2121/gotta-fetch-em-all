
import "./Form.css"

export default function Form() {

const onLogin = (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const entries = [...formData.entries()];

    const player = entries.reduce((acc, entry) =>{
        const [k,v] = entry;
        acc[k] = v;
        return acc;
    },{});
    console.log(player)
    
}

const onSubmit = (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const entries = [...formData];
    
    const player = entries.reduce((acc, entry) =>{
        const [k,v] = entry;
        acc[k] = v;
        return acc;
    },{});
    console.log(player)
}



    return (
        <div className="principalContainer">
            <div className="blackScreen">
                <div className="container">
                    <input id="register_toggle" type="checkbox" />
                    <div className="slider">
                        <form className="form" onSubmit={onLogin}>
                            <span className="title">Login</span>
                            <div className="form_control">
                                <input required="" className="input" type="text" name="username" id="username" />
                                <label className="label" htmlFor="username">Username</label>
                            </div>
                            <div className="form_control">
                                <input required="" className="input" type="password" name="password" id="password" />
                                <label className="label" htmlFor="password">Password</label>
                            </div>
                            <button type="submit">Login</button>


                            <span className="bottom_text">Don't have an account? <label className="swtich" htmlFor="register_toggle">Sign Up</label> </span>
                        </form>
                        <form className="form" onSubmit={onSubmit}>
                            <span className="title">Sign Up</span>
                            <div className="form_control">
                                <input required="" className="input" type="text"  name="username" id="username"/>
                                <label className="label" htmlFor="username">Username</label>
                            </div>
                            <div className="form_control">
                                <input required="" className="input" type="email" name="email" id="email"/>
                                <label className="label" htmlFor="email">Email</label>
                            </div>
                            <div className="form_control">
                                <input required="" className="input" type="password" name="password" id="password"/>
                                <label className="label" htmlFor="password">Password</label>
                            </div>
                            <button>Sign Up</button>

                            <span className="bottom_text">Already have an account? <label className="swtich" htmlFor="register_toggle">Sign In</label> </span>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    )
}