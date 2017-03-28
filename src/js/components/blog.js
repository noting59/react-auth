import React from 'react';

class Blog extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">All posts</h1>
                </div>
                <div className="col-md-12">
                    This page is only shown for registreted users!
                </div>
            </div>
        );
    }
}

export default Blog;
