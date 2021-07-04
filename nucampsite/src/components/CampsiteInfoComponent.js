import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,  Button, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends Component{
    constructor(props){
        super(props)

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            isModalOpen: false,
            text: '',
            author: '',
            touched:{
                author: false
            }
        }
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);    
    }

    render(){
        return(
            <React.Fragment>
                <Button className="fa fa-pencil fa-lg" outline onClick={this.toggleModal}>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader className="commentModal" toggle={this.toggleModal} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select
                                className="form-control"
                                model=".rating"
                                id="rating"
                                name="rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text
                                className="form-control"
                                model=".author"
                                id="author"
                                name="author"
                                placeholder="Your Name" 
                                validators={{
                                    required, 
                                    minLength: minLength(2), 
                                    maxLength: maxLength(15)
                                }}
                                />
                                <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters', 
                                            maxLength: 'Must be 15 or fewer characters'
                                        }}
                                        />
                                
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Your Comment</Label>
                                <Control.textarea
                                className="form-control"
                                model=".text"
                                id="text"
                                name="text"
                                rows="6"/>
                            </div>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

    function RenderCampsite({campsite}){
        return(
            <div className="col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>          
            </div>
        );
    }
    function RenderComments({comments, addComment, campsiteId}){
        if(comments){
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map((comments) =>
                        <div key={comments.id}>{comments.author}<br></br> --{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</div>)}
                    <CommentForm campsiteId={campsiteId} addComment={addComment} />
                </div>
            );
        }return <div />;
    }

    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments
                        comments={props.comments} 
                        addComment={props.addComment}
                        campsiteId={props.campsiteId}
                        />
                    </div>
                </div>
            );
        }
        return <div />;
    }

export default CampsiteInfo;