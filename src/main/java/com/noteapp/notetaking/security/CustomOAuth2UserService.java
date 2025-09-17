package com.noteapp.notetaking.security;

import com.noteapp.notetaking.entity.User;
import com.noteapp.notetaking.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);

        String registrationId = request.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getName(); //Google: sub, Github: numeric ID
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        User user;

        if (registrationId.equals("google")) {
            user = userRepository.findByGoogleId(providerId).orElse(new User());
            user.setEmail(email);
            user.setName(name);
            user.setProfilePicture(oAuth2User.getAttribute("picture"));
            user.setAuthProvider("GOOGLE");
            user.setGoogleId(providerId);
            user.setVerified(true);

            userRepository.save(user);
        } else if (registrationId.equals("github")) {
            user = userRepository.findByGithubId(providerId).orElse(new User());
            user.setName(name != null ? name : oAuth2User.getAttribute("login"));
            user.setProfilePicture(oAuth2User.getAttribute("avatar_url"));
            user.setAuthProvider("GITHUB");
            user.setGithubId(providerId);
            if (email == null) email = oAuth2User.getAttribute("login") + "@github.local";
            user.setEmail(email);
            user.setVerified(true);

            userRepository.save(user);
        }

        return oAuth2User;
    }
}
