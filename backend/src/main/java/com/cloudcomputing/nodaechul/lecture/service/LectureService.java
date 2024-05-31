package com.cloudcomputing.nodaechul.lecture.service;

import com.cloudcomputing.nodaechul.lecture.domain.model.dto.CreateLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.GetLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.InviteLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.JoinLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.repository.LectureRepository;
import com.cloudcomputing.nodaechul.lecture.exception.AlreadyJoinedException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidInvitationCodeException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidLectureIdException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidLectureNameException;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LectureService {

    private final LectureRepository lectureRepository;

    @Transactional
    public Long createLecture(CreateLectureRequestDto createLectureRequestDto) {
        String invitation_code = UUID.randomUUID().toString();
        createLectureRequestDto.setInvitation_code(invitation_code);
        // 중복된 강의명인지 유효성 검사
        if (lectureRepository.isLectureNameExists(createLectureRequestDto)) {
            throw new InvalidLectureNameException("중복된 강의명입니다.");
        }

        // todo 수업 생성 시 교수도 수업에 참여
        return lectureRepository.createLecture(createLectureRequestDto);
    }

    public String inviteLecture(InviteLectureRequestDto inviteLectureRequestDto) {
        // 강의 ID 존재 유효성 검사
        if (!isLectureIDExists(inviteLectureRequestDto.getId())) {
            throw new InvalidLectureIdException("존재하지 않는 강의입니다.");
        }
        return lectureRepository.inviteLecture(inviteLectureRequestDto);
    }

    @Transactional
    public Long joinLecture(JoinLectureRequestDto joinLectureRequestDto) {
        joinLectureRequestDto.setAvatar("test_IMG_URL");
        // 강의 ID 존재 유효성 검사
        if (!isLectureIDExists(joinLectureRequestDto.getLecture_id())) {
            throw new InvalidLectureIdException("존재하지 않는 강의입니다.");
        }
        // 강의 중복 참여 유효성 검사
        if (lectureRepository.alreadyJoined(joinLectureRequestDto)) {
            throw new AlreadyJoinedException("이미 참여한 강의입니다.");
        }
        // 초대 코드 유효성 검사
        if(!joinLectureRequestDto.getInvitation_code().equals(lectureRepository.checkInvitationCode(joinLectureRequestDto))){
            throw new InvalidInvitationCodeException("초대 코드가 맞지 않습니다.");
        }
        return lectureRepository.joinLecture(joinLectureRequestDto);
    }

    private Boolean isLectureIDExists(Long lecture_id) {
        return lectureRepository.isLectureIdExists(lecture_id);
    }

    public List<GetLectureRequestDto> getLecturesByUserID(Long userId) {
        return lectureRepository.getLecturesByUserID(userId);
    }
}