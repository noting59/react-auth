import React from 'react';

class VKLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSdkLoaded: false,
            isProcessing: false
        };
    }


    componentDidMount() {
        if (document.getElementById('vk-jssdk')) {
            this.setState({ isSdkLoaded: true });
            return;
        }
        this.setFbAsyncInit();
        this.loadSdkAsynchronously();
    }

    setFbAsyncInit() {
        const { apiId } = this.props;

        window.vkAsyncInit = () => {
          window.VK.init({ apiId });
          this.setState({ isSdkLoaded: true });
        };
    }


    loadSdkAsynchronously() {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = 'https://vk.com/js/api/openapi.js?139';
        el.async = true;
        el.id = 'vk-jssdk';
        document.getElementsByTagName('head')[0].appendChild(el);
    }

    checkLoginState = (response) => {
        this.setState({ isProcessing: false });

        if (this.props.callback) {
          this.props.callback(response);
        }
    };

    clickHandler = () => {
        if (!this.state.isSdkLoaded || this.state.isProcessing || this.props.disabled) {
            return;
        }
        this.setState({ isProcessing: true });
        window.VK.Auth.login(this.checkLoginState, { scope: this.props.scope });
    };

  render() {
    const { disabled, callback, apiId, className, textButton } = this.props;
    return (
      <div className='right'>
        <button className={className} onClick={this.clickHandler}>
            {textButton}
        </button>
      </div>
    );
  }
}

VKLogin.propTypes = {
  disabled: React.PropTypes.bool,
  callback: React.PropTypes.func.isRequired,
  apiId: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  textButton: React.PropTypes.string.isRequired
};

export default VKLogin;
