var VersionButton = React.createClass({
  uploadSelect: function(event) {
    $('#' + this.props.title + '-upload').click();
    event.preventDefault();
  },
  uploadSubmit: function() {
    var file = $('#' + this.props.title + '-upload')[0].files[0];

    var formData = new FormData();
    formData.append("blendfile", file);

    $.ajax({
      url: '/vis/' + this.props.title + '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        $('#flash').html(
          '<div class="alert alert-success" role="alert"><span class="octicon octicon-check" /> Upload successful</div>'
        );
      },
      error: function(jqXHR, textStatus, errorMessage) {
        $('#flash').html(
          '<div class="alert alert-error" role="alert"><span class="octicon octicon-x" /> ' + errorMessage + '</div>'
        );
      }
    });
  },
  updateSubmit: function(event) {
    event.preventDefault();

    console.log('boo')

    $.ajax({
      url: '/vis/' + this.props.title + '/update',
      type: 'POST',
      success: function(response) {
        $('#flash').html(
          '<div class="alert alert-success" role="alert"><span class="octicon octicon-check" /> Update successful</div>'
        );
      },
      error: function(jqXHR, textStatus, errorMessage) {
        $('#flash').html(
          '<div class="alert alert-error" role="alert"><span class="octicon octicon-x" /> ' + errorMessage + '</div>'
        );
      }
    });
  },
  render: function() {
    var label;
    if(this.props.currentVersionID === 'latest') {
      label = 'Latest Version';
    } else {
      label = 'Version ' + this.state.currentVersionID;
    }

    var versions = this.props.versions.map(function(version, index) {
      return(
        <li key={index}>
          <a href="#" onClick={this.props.changeVersion.bind(null, version.version)}>
            {version.version}
          </a>
        </li>
      );
    }.bind(this));

    return(
      <span className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="octicon octicon-versions" /> {label}
        </a>
        <ul className="dropdown-menu">
          <li className="dropdown-header">
            <span className="octicon octicon-sync" /> Dynamic Versions
          </li>
          <li>
            <a href="#" onClick={this.props.changeVersion.bind(null, 'latest')}>
              Latest
            </a>
          </li>
          <li className="disabled">
            <a href="#" onClick={this.props.changeVersion.bind(null, 'latest-published')}>
              Latest Published
            </a>
          </li>
          <li role="separator" className="divider"></li>

          <li className="dropdown-header">
            <span className="octicon octicon-lock" /> Permament Versions
          </li>
          {versions}
          <li role="separator" className="divider"></li>

          <li className="dropdown-header">
            <span className="octicon octicon-cloud-upload" /> New Version
          </li>
          <li>
            <a href="#" onClick={this.uploadSelect} >
              <span className="text-warning octicon octicon-alert" /> Upload blendfile
            </a>
            <input type="file"
                   id={this.props.title + '-upload'}
                   style={{display: 'none'}}
                   accept=".blend"
                   onChange={this.uploadSubmit} />
          </li>
          <li>
            <a href="#" onClick={this.updateSubmit} >
              <span className="text-danger octicon octicon-alert" /> Update from source
            </a>
          </li>
        </ul>
      </span>
    );
  }
});
