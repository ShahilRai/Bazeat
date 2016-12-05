import React from 'react';

export default class UpdateYourPassword extends React.Component {

  render() {
        return (
                <div className="edit_prfile_detail_form">
                    <h3>Update your password</h3>
                    <form className="ptop30">
                        <div className="passwrd_txt">
                            <p className="">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam nibh. Nunc varius facilisis.</p>
                        </div>

                        <div className="passwrd_form">
                            <div className="form-group row">
                                <label for="example-search-input" className="col-md-4 col-xs-12 col-form-label">Old password</label>
                                <div className="col-md-7 col-xs-12">
                                    <input className="form-control" type="search" value=""/>
                                </div>

                            </div>
                            <div className="form-group row">
                                <label for="example-search-input" className="col-md-4 col-xs-12 col-form-label">New password</label>
                                <div className="col-md-7 col-xs-12">
                                    <input className="form-control" type="search" value=""/>
                                </div>

                            </div>

                            <div className="form-group row">
                                <label for="example-url-input" className="col-md-4 col-xs-12 col-form-label">Confirm new password</label>
                                <div className="col-md-7 col-xs-12">
                                    <input className="form-control" type="email" value=""/>
                                </div>

                            </div>
                            
                        </div>
                    
                        <div className="profile_gry_bot_bar">
                            <button type="submit" className="btn pull-right">Update password</button>
                        </div>
                        
                    </form>
                </div>            
                
        );
    }
}


