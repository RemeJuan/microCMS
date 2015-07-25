var locale = {};

//Global
locale.saveButt = 'Save';
locale.cancelButt = 'Cancel';

/*Headings and Labels*/
locale.headTitle = 'Title';
locale.headDate = 'Date';
locale.siteName = 'microCMS';
locale.signIn = 'Sign In';
locale.forgotPW = 'Forgot Password?';
locale.rememberMe = 'Remember Me';
locale.forgotPassword = 'Forgot Password';
locale.createNewPassword = 'Create new password';
locale.login = 'Login';
locale.signup = 'Sign Up';
locale.reset = 'Reset';
locale.submit = 'Submit';

//Content
locale.contentTitle = 'Content';
locale.editContent = 'Edit Content';
locale.createContent = 'Create Content';
locale.labTitle = 'Title:';
locale.labSlug = 'URL Path:';
locale.labContent = 'Content:';
locale.labMeta = 'Meta Tags:';
locale.labKeyWords = 'Keywords:';
locale.toolTitle = 'The title for the Article or Post';
locale.toolSlug = 'The URL display path: http://sitename.ext/urlpath';
locale.toolContent = 'The main content of the article or post';
locale.toolMeta = 'Single sentence to descript eh article';
locale.toolKeyWords = 'A few comma seperated keywords, up to 20';
locale.labDetails = 'Details';
locale.detAuthor = 'Author:';
locale.detCreated = 'Created:';
locale.detModBy = 'Modified By:';
locale.lastMod = 'Last Modified:';
locale.revision = 'Revision:';

// Profile
locale.profileUserTitle = 'Profile';
locale.labUserNameSurname = 'Name and Surname:';
locale.labEmail = 'Email Address:';
locale.labPassword = 'Password:';
locale.gravatar = 'Profile Pic';
locale.picFootnote = 'Gravatar image';
locale.phFirstName = 'First Name';
locale.phLastName = 'Last Name';
locale.phEmail = 'Email Address';
locale.phPassword = 'Password';
locale.phConPassword = 'Confirmation';

/*User Admin*/
locale.usersMan = 'Manage Users';
locale.headName = 'Users Name';
locale.headEmail = 'Users E-mail Address';
locale.headCreateEdit = 'Create/Edit User';
locale.descCreateEdit = 'To create a new user, simply complete the form and click save, if the user does not exist and account will automatically be created.';

/*Site Admin*/
locale.siteAdmin = 'Site Administration';
locale.headSiteDet = 'Site Details';
locale.adminSiteTitle = 'Site Name:';
locale.adminSiteEmail = 'Site Email:';
locale.adminSiteMeta = 'Site Meta Data:';
locale.adminSiteKey = 'Site Keywords:';

locale.phSiteTitle = 'Site Name';
locale.phSiteEmail = 'Site Email';
locale.phSiteMeta = 'Site Meta Data';
locale.phSiteKey = 'Site keywords';

//Messages
/*Global notification messages*/
locale.classError = 'danger';
locale.classSuccess = 'success';

/*Content notification messages*/
locale.contentUpdateSuccess = 'Content updated successfully';
locale.contentUpdateError = 'Error updating content';
locale.slugError = 'Slug needs to be unique';
locale.slugInUseError = 'That slug is already in use';
locale.conTitVal = 'Please enter a title';
locale.conSlugVal = 'Please enter a slug';
locale.conBodyVal = 'Please enter some content';

/*User*/
locale.fnVal = 'Please enter your first name';
locale.snVal = 'Please enter your last name';
locale.emailVal = 'Please enter your email';
locale.pwVal = 'Please enter your password';
locale.emailInvaledVal = 'That email is already in use';
locale.updateUserErr = 'There was a problem updating your details';
locale.updateUserSuc = 'Details updated sucessfully';

//Dashboard
locale.dashboard = 'Dashboard';

//Navigation
locale.navDashboard = 'Dashboard';
locale.navContent = 'Content';
locale.navConCreate = 'Create';
locale.navConList = 'List';
locale.navAdmin = 'Administration';
locale.navSiteAdmin = 'Site Administration';
locale.navUserMan = 'User Management';
locale.navProfile = 'Profile';
locale.navLogout = 'Logout';

module.exports = locale;